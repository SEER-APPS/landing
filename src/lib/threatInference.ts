import type * as Ort from "onnxruntime-web";

import {
  coarseCategoryForThreatType,
  displayLabelForThreatType,
  FINE_CLASS_NAMES,
  type CoarseThreatCategory,
} from "./threatTaxonomy";

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
  threatType?: string | null;
  threatCategory?: CoarseThreatCategory | null;
  label?: string;
  error?: string;
};

export type WindowModelScore = {
  modelName: string;
  confidence: number;
  isThreat: boolean;
  threatType?: string | null;
  threatCategory?: CoarseThreatCategory | null;
  label?: string;
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

type WindowScoreDetail = {
  confidence: number;
  isThreat: boolean;
  threatType: string | null;
  threatCategory: CoarseThreatCategory | null;
  label: string;
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
        const windowDetails: WindowScoreDetail[] = [];

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
            windowDetails.push(classifyLogits(values, model.threshold));
          } finally {
            if (typeof input.dispose === "function") {
              input.dispose();
            }
          }
        }

        return {
          model,
          windowDetails,
          error: undefined as string | undefined,
        };
      } catch (caughtError) {
        console.error(`Threat detection failed for ${model.name}`, caughtError);
        return {
          model,
          windowDetails: windows.map(
            (): WindowScoreDetail => ({
              confidence: 0,
              isThreat: false,
              threatType: null,
              threatCategory: null,
              label: "No threat",
            }),
          ),
          error: "Detection unavailable",
        };
      }
    }),
  );

  const windowAnalyses: WindowAnalysis[] = windows.map((_, windowIndex) => ({
    startSec: windowIndex,
    scores: perModelWindowScores.map(({ model, windowDetails, error }) => {
      const detail = windowDetails[windowIndex]!;
      return {
        modelName: model.name,
        confidence: detail.confidence,
        isThreat: !error && detail.isThreat,
        threatType: detail.threatType,
        threatCategory: detail.threatCategory,
        label: detail.label,
        error,
      };
    }),
  }));

  const summary: ThreatResult[] = perModelWindowScores.map(
    ({ model, windowDetails, error }) => {
      if (error) {
        return {
          modelName: model.name,
          isThreat: false,
          confidence: 0,
          error,
        };
      }
      let best = windowDetails[0]!;
      for (const detail of windowDetails) {
        if (detail.confidence > best.confidence) {
          best = detail;
        }
      }
      return {
        modelName: model.name,
        isThreat: best.isThreat,
        confidence: best.confidence,
        threatType: best.threatType,
        threatCategory: best.threatCategory,
        label: best.isThreat
          ? `${best.label} detected`
          : "No threat",
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
      samples[lowerIndex]! * (1 - fraction) +
      samples[upperIndex]! * fraction;
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

function softmax(logits: number[]): number[] {
  const highest = Math.max(...logits);
  const exps = logits.map((logit) => Math.exp(logit - highest));
  const sum = exps.reduce((total, value) => total + value, 0);
  return exps.map((value) => value / sum);
}

/** Binary or fine multiclass logits → threat decision + labels. */
export function classifyLogits(
  logits: number[],
  threshold: number,
): WindowScoreDetail {
  if (logits.length < 2) {
    const confidence = 1 / (1 + Math.exp(-logits[0]!));
    const isThreat = confidence >= threshold;
    return {
      confidence,
      isThreat,
      threatType: isThreat ? "other" : null,
      threatCategory: isThreat ? "other" : null,
      label: isThreat ? displayLabelForThreatType("other") : "No threat",
    };
  }

  // Legacy binary: [no_threat, threat]
  if (logits.length === 2) {
    const probs = softmax([logits[0]!, logits[1]!]);
    const confidence = probs[1]!;
    const isThreat = confidence >= threshold;
    return {
      confidence,
      isThreat,
      threatType: isThreat ? "other" : null,
      threatCategory: isThreat ? "other" : null,
      label: isThreat ? displayLabelForThreatType("other") : "No threat",
    };
  }

  const classCount = Math.min(logits.length, FINE_CLASS_NAMES.length);
  const classNames = FINE_CLASS_NAMES.slice(0, classCount);
  const probs = softmax(Array.from(logits.slice(0, classCount)));
  const threatMass = probs.slice(1).reduce((total, value) => total + value, 0);
  const isThreat = threatMass >= threshold;

  let bestThreatIndex = 1;
  let bestThreatProb = probs[1] ?? 0;
  for (let index = 2; index < probs.length; index++) {
    if ((probs[index] ?? 0) > bestThreatProb) {
      bestThreatProb = probs[index]!;
      bestThreatIndex = index;
    }
  }

  const threatType = isThreat ? classNames[bestThreatIndex]! : null;
  const threatCategory = threatType
    ? coarseCategoryForThreatType(threatType)
    : null;

  return {
    confidence: threatMass,
    isThreat,
    threatType,
    threatCategory,
    label: isThreat
      ? displayLabelForThreatType(threatType!)
      : "No threat",
  };
}

/** @deprecated Prefer classifyLogits — kept for callers that only need P(threat). */
export function threatProbability(logits: number[]): number {
  return classifyLogits(logits, 0).confidence;
}
