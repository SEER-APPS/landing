import type * as Ort from "onnxruntime-web";

export const THREAT_SAMPLE_RATE = 16_000;
export const THREAT_WINDOW_SAMPLES = 16_000;

export type ThreatModelDefinition = {
  name: string;
  path: string;
  threshold: number;
};

export type ThreatResult = {
  modelName: string;
  isThreat: boolean;
  confidence: number;
  error?: string;
};

export type WindowModelScore = {
  modelName: string;
  confidence: number;
  isThreat: boolean;
  error?: string;
};

export type WindowAnalysis = {
  startSec: number;
  scores: WindowModelScore[];
};

export type ClassificationReport = {
  summary: ThreatResult[];
  windows: WindowAnalysis[];
};

type OrtModule = typeof Ort & {
  default?: typeof Ort;
};

let runtimePromise: Promise<typeof Ort> | null = null;
const sessionPromises = new Map<string, Promise<Ort.InferenceSession>>();

function assetUrl(pathname: string): string {
  if (typeof window === "undefined") {
    return pathname;
  }
  return new URL(pathname, window.location.origin).href;
}

async function getRuntime(): Promise<typeof Ort> {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      // Load the browser build from /public so Next/Turbopack does not rewrite WASM paths.
      const moduleUrl = assetUrl("/onnxruntime/ort.wasm.min.mjs");
      const loaded = (await import(
        /* webpackIgnore: true */ moduleUrl
      )) as OrtModule;
      const runtime = (loaded.default ?? loaded) as typeof Ort;

      runtime.env.wasm.numThreads = 1;
      runtime.env.wasm.proxy = false;
      runtime.env.wasm.wasmPaths = {
        wasm: assetUrl("/onnxruntime/ort-wasm-simd-threaded.wasm"),
        mjs: assetUrl("/onnxruntime/ort-wasm-simd-threaded.mjs"),
      };

      return runtime;
    })().catch((error: unknown) => {
      runtimePromise = null;
      throw error;
    });
  }

  return runtimePromise;
}

async function getSession(
  model: ThreatModelDefinition,
): Promise<Ort.InferenceSession> {
  const existingSession = sessionPromises.get(model.path);
  if (existingSession) {
    return existingSession;
  }

  const sessionPromise = getRuntime()
    .then((runtime) =>
      runtime.InferenceSession.create(assetUrl(model.path), {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      }),
    )
    .catch((error: unknown) => {
      sessionPromises.delete(model.path);
      throw error;
    });

  sessionPromises.set(model.path, sessionPromise);
  return sessionPromise;
}

export async function classifyAudio(
  samples: Float32Array,
  models: ThreatModelDefinition[],
): Promise<ClassificationReport> {
  const windows = createWindows(samples);
  if (windows.length === 0) {
    const summary = models.map((model) => ({
      modelName: model.name,
      isThreat: false,
      confidence: 0,
      error: "Audio too short",
    }));
    return { summary, windows: [] };
  }

  const perModelWindowScores = await Promise.all(
    models.map(async (model) => {
      try {
        const session = await getSession(model);
        const runtime = await getRuntime();
        const windowScores: number[] = [];

        for (const windowSamples of windows) {
          const input = new runtime.Tensor(
            "float32",
            windowSamples,
            [1, THREAT_WINDOW_SAMPLES],
          );
          try {
            const outputs = await session.run({ audio: input });
            const logits = outputs.logits ?? outputs[session.outputNames[0]];
            if (!logits?.data) {
              throw new Error("Empty model output");
            }
            const values = Array.from(logits.data as Float32Array);
            windowScores.push(threatProbability(values));
          } finally {
            if (typeof input.dispose === "function") {
              input.dispose();
            }
          }
        }

        return { model, windowScores, error: undefined as string | undefined };
      } catch (caughtError) {
        console.error(`Threat detection failed for ${model.name}`, caughtError);
        return {
          model,
          windowScores: windows.map(() => 0),
          error: "Detection unavailable",
        };
      }
    }),
  );

  const windowAnalyses: WindowAnalysis[] = windows.map((_, windowIndex) => ({
    startSec: windowIndex,
    scores: perModelWindowScores.map(({ model, windowScores, error }) => {
      const confidence = windowScores[windowIndex] ?? 0;
      return {
        modelName: model.name,
        confidence,
        isThreat: !error && confidence >= model.threshold,
        error,
      };
    }),
  }));

  const summary: ThreatResult[] = perModelWindowScores.map(
    ({ model, windowScores, error }) => {
      if (error) {
        return {
          modelName: model.name,
          isThreat: false,
          confidence: 0,
          error,
        };
      }
      const confidence = Math.max(0, ...windowScores);
      return {
        modelName: model.name,
        isThreat: confidence >= model.threshold,
        confidence,
      };
    },
  );

  return { summary, windows: windowAnalyses };
}

export function downmixAudioBuffer(audioBuffer: AudioBuffer): Float32Array {
  const monoSamples = new Float32Array(audioBuffer.length);

  for (
    let channelIndex = 0;
    channelIndex < audioBuffer.numberOfChannels;
    channelIndex++
  ) {
    const channelSamples = audioBuffer.getChannelData(channelIndex);
    for (
      let sampleIndex = 0;
      sampleIndex < channelSamples.length;
      sampleIndex++
    ) {
      monoSamples[sampleIndex] +=
        channelSamples[sampleIndex] / audioBuffer.numberOfChannels;
    }
  }

  return resampleLinear(
    monoSamples,
    audioBuffer.sampleRate,
    THREAT_SAMPLE_RATE,
  );
}

export function resampleLinear(
  samples: Float32Array,
  sourceRate: number,
  targetRate: number,
): Float32Array {
  if (sourceRate === targetRate) {
    return samples.slice();
  }

  const outputLength = Math.max(
    1,
    Math.round((samples.length * targetRate) / sourceRate),
  );
  const output = new Float32Array(outputLength);
  const ratio = sourceRate / targetRate;

  for (let outputIndex = 0; outputIndex < outputLength; outputIndex++) {
    const sourcePosition = outputIndex * ratio;
    const lowerIndex = Math.floor(sourcePosition);
    const upperIndex = Math.min(lowerIndex + 1, samples.length - 1);
    const fraction = sourcePosition - lowerIndex;
    output[outputIndex] =
      samples[lowerIndex] * (1 - fraction) +
      samples[upperIndex] * fraction;
  }

  return output;
}

function createWindows(samples: Float32Array): Float32Array[] {
  if (samples.length <= THREAT_WINDOW_SAMPLES) {
    const paddedWindow = new Float32Array(THREAT_WINDOW_SAMPLES);
    const destinationOffset = Math.floor(
      (THREAT_WINDOW_SAMPLES - samples.length) / 2,
    );
    paddedWindow.set(samples, destinationOffset);
    return [paddedWindow];
  }

  const windows: Float32Array[] = [];
  for (
    let startIndex = 0;
    startIndex < samples.length;
    startIndex += THREAT_WINDOW_SAMPLES
  ) {
    const windowSamples = samples.subarray(
      startIndex,
      Math.min(startIndex + THREAT_WINDOW_SAMPLES, samples.length),
    );
    if (windowSamples.length === THREAT_WINDOW_SAMPLES) {
      windows.push(windowSamples.slice());
    } else if (windowSamples.length >= THREAT_SAMPLE_RATE / 2) {
      const paddedWindow = new Float32Array(THREAT_WINDOW_SAMPLES);
      paddedWindow.set(windowSamples);
      windows.push(paddedWindow);
    }
  }

  return windows;
}

function threatProbability(logits: number[]): number {
  if (logits.length < 2) {
    return 1 / (1 + Math.exp(-logits[0]));
  }

  const highestLogit = Math.max(logits[0], logits[1]);
  const safeScore = Math.exp(logits[0] - highestLogit);
  const threatScore = Math.exp(logits[1] - highestLogit);
  return threatScore / (safeScore + threatScore);
}
