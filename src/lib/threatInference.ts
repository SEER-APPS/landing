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
};

let runtimePromise: Promise<typeof Ort> | null = null;
const sessionPromises = new Map<string, Promise<Ort.InferenceSession>>();

async function getRuntime(): Promise<typeof Ort> {
  if (!runtimePromise) {
    runtimePromise = import("onnxruntime-web").then((runtime) => {
      runtime.env.wasm.numThreads = 1;
      runtime.env.wasm.wasmPaths = "/onnxruntime/";
      return runtime;
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

  const sessionPromise = getRuntime().then((runtime) =>
    runtime.InferenceSession.create(model.path, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    }),
  );
  sessionPromises.set(model.path, sessionPromise);
  return sessionPromise;
}

export async function classifyAudio(
  samples: Float32Array,
  models: ThreatModelDefinition[],
): Promise<ThreatResult[]> {
  const windows = createWindows(samples);

  return Promise.all(
    models.map(async (model) => {
      const session = await getSession(model);
      const runtime = await getRuntime();
      let highestConfidence = 0;

      for (const windowSamples of windows) {
        const input = new runtime.Tensor(
          "float32",
          windowSamples,
          [1, THREAT_WINDOW_SAMPLES],
        );
        const outputs = await session.run({ audio: input });
        const logits = outputs.logits ?? outputs[session.outputNames[0]];
        const values = Array.from(logits.data as Float32Array);
        const confidence = threatProbability(values);
        highestConfidence = Math.max(highestConfidence, confidence);
        input.dispose();
      }

      return {
        modelName: model.name,
        isThreat: highestConfidence >= model.threshold,
        confidence: highestConfidence,
      };
    }),
  );
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
