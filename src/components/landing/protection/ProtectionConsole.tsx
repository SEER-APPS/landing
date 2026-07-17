"use client";

import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  classifyAudio,
  downmixAudioBuffer,
  resampleLinear,
  THREAT_SAMPLE_RATE,
  type ThreatModelDefinition,
  type ThreatResult,
} from "@/lib/threatInference";

const primaryModel: ThreatModelDefinition = {
  name: "Seer 1",
  path: "/models/seer-1.onnx",
  threshold: 0.8254073262214661,
};

const comparisonModel: ThreatModelDefinition = {
  name: "Seer 2",
  path: "/models/seer-2.onnx",
  threshold: 0.5,
};

type Mode = "live" | "file";

export function ProtectionConsole({
  showComparison,
}: {
  showComparison: boolean;
}) {
  const [mode, setMode] = useState<Mode>("live");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [results, setResults] = useState<ThreatResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const liveSamplesRef = useRef<number[]>([]);
  const inferenceActiveRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const models = useMemo(
    () =>
      showComparison
        ? [primaryModel, comparisonModel]
        : [primaryModel],
    [showComparison],
  );

  const stopListening = useCallback(async () => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    await audioContextRef.current?.close();
    processorRef.current = null;
    sourceRef.current = null;
    mediaStreamRef.current = null;
    audioContextRef.current = null;
    liveSamplesRef.current = [];
    setIsListening(false);
    setLevel(0);
  }, []);

  useEffect(() => {
    return () => {
      void stopListening();
    };
  }, [stopListening]);

  const runDetection = useCallback(
    async (samples: Float32Array) => {
      if (inferenceActiveRef.current) {
        return;
      }

      inferenceActiveRef.current = true;
      setIsProcessing(true);
      setError(null);
      try {
        setResults(await classifyAudio(samples, models));
      } catch (caughtError) {
        console.error("Threat detection failed", caughtError);
        setError("Detection unavailable");
      } finally {
        inferenceActiveRef.current = false;
        setIsProcessing(false);
      }
    },
    [models],
  );

  const startListening = async () => {
    setError(null);
    setResults([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: false,
          noiseSuppression: false,
        },
      });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      const silentGain = audioContext.createGain();
      silentGain.gain.value = 0;

      processor.onaudioprocess = (event) => {
        const channelSamples = event.inputBuffer.getChannelData(0);
        let squaredTotal = 0;
        for (const sample of channelSamples) {
          liveSamplesRef.current.push(sample);
          squaredTotal += sample * sample;
        }
        setLevel(Math.min(1, Math.sqrt(squaredTotal / channelSamples.length) * 6));

        if (liveSamplesRef.current.length >= audioContext.sampleRate) {
          const oneSecondSamples = Float32Array.from(
            liveSamplesRef.current.splice(0, audioContext.sampleRate),
          );
          const resampled = resampleLinear(
            oneSecondSamples,
            audioContext.sampleRate,
            THREAT_SAMPLE_RATE,
          );
          void runDetection(resampled);
        }
      };

      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(audioContext.destination);
      mediaStreamRef.current = stream;
      audioContextRef.current = audioContext;
      sourceRef.current = source;
      processorRef.current = processor;
      setIsListening(true);
    } catch (caughtError) {
      console.error("Microphone access failed", caughtError);
      setError("Microphone unavailable");
    }
  };

  const processFile = async (file: File) => {
    setFileName(file.name);
    setResults([]);
    setError(null);
    setIsProcessing(true);

    const audioContext = new AudioContext();
    try {
      const encodedAudio = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(encodedAudio);
      await runDetection(downmixAudioBuffer(audioBuffer));
    } catch (caughtError) {
      console.error("Audio file detection failed", caughtError);
      setError("Audio file unavailable");
    } finally {
      await audioContext.close();
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);
    if (file) {
      void processFile(file);
    }
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const [file] = Array.from(event.dataTransfer.files);
    if (file?.type.startsWith("audio/")) {
      void processFile(file);
    }
  };

  const selectMode = (nextMode: Mode) => {
    if (nextMode !== "live" && isListening) {
      void stopListening();
    }
    setMode(nextMode);
    setResults([]);
    setError(null);
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Seer
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
            Protection
          </h1>
        </div>
        <div className="inline-flex w-fit rounded-xl border border-border bg-surface p-1">
          <ModeButton
            active={mode === "live"}
            label="Live"
            onClick={() => selectMode("live")}
          />
          <ModeButton
            active={mode === "file"}
            label="File"
            onClick={() => selectMode("file")}
          />
        </div>
      </div>

      <div className="grid flex-1 gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
          {mode === "live" ? (
            <LivePanel
              isListening={isListening}
              level={level}
              onStart={() => void startListening()}
              onStop={() => void stopListening()}
            />
          ) : (
            <FilePanel
              fileName={fileName}
              isDragging={isDragging}
              isProcessing={isProcessing}
              inputRef={fileInputRef}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onFileChange={handleFileChange}
            />
          )}
        </div>

        <div className="flex min-h-60 flex-col rounded-[2rem] border border-border bg-foreground p-6 text-background sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-65">Result</span>
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isListening
                  ? "animate-pulse bg-emerald-400"
                  : "bg-background/25"
              }`}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4 py-8">
            {isProcessing && results.length === 0 ? (
              <div className="h-2 w-full overflow-hidden rounded-full bg-background/15">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-brand" />
              </div>
            ) : error ? (
              <p className="text-2xl font-semibold tracking-tight">{error}</p>
            ) : results.length > 0 ? (
              results.map((result) => (
                <ResultCard
                  key={result.modelName}
                  result={result}
                  showName={showComparison}
                />
              ))
            ) : (
              <p className="text-3xl font-semibold tracking-[-0.03em] opacity-30">
                Ready
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`min-h-10 rounded-lg px-5 text-sm font-semibold transition-colors ${
        active
          ? "bg-foreground text-background"
          : "text-muted hover:text-foreground"
      }`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function LivePanel({
  isListening,
  level,
  onStart,
  onStop,
}: {
  isListening: boolean;
  level: number;
  onStart: () => void;
  onStop: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className={`relative flex h-40 w-40 items-center justify-center rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:h-48 sm:w-48 ${
          isListening
            ? "bg-foreground text-background"
            : "bg-brand-soft text-brand hover:scale-[1.02]"
        }`}
        aria-label={isListening ? "Stop listening" : "Start listening"}
        onClick={isListening ? onStop : onStart}
      >
        {isListening && (
          <span
            className="absolute inset-0 rounded-full border-2 border-brand transition-transform"
            style={{ transform: `scale(${1.08 + level * 0.18})` }}
          />
        )}
        <MicrophoneIcon />
      </button>
      <p className="mt-7 text-lg font-semibold">
        {isListening ? "Listening" : "Start listening"}
      </p>
    </div>
  );
}

function FilePanel({
  fileName,
  isDragging,
  isProcessing,
  inputRef,
  onDragEnter,
  onDragLeave,
  onDrop,
  onFileChange,
}: {
  fileName: string | null;
  isDragging: boolean;
  isProcessing: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className={`flex w-full max-w-lg flex-col items-center rounded-3xl border border-dashed p-10 text-center transition-colors sm:p-14 ${
        isDragging
          ? "border-brand bg-brand-soft/60"
          : "border-border bg-background"
      }`}
      onDragEnter={(event) => {
        event.preventDefault();
        onDragEnter();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept="audio/*"
        onChange={onFileChange}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <UploadIcon />
      </div>
      <p className="mt-5 max-w-full truncate text-lg font-semibold">
        {fileName ?? "Drop audio here"}
      </p>
      <button
        type="button"
        className="mt-5 min-h-11 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        disabled={isProcessing}
        onClick={() => inputRef.current?.click()}
      >
        {isProcessing ? "Detecting" : "Choose file"}
      </button>
    </div>
  );
}

function ResultCard({
  result,
  showName,
}: {
  result: ThreatResult;
  showName: boolean;
}) {
  return (
    <div className="border-b border-background/15 pb-4 last:border-0 last:pb-0">
      {showName && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] opacity-50">
          {result.modelName}
        </p>
      )}
      <div className="flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-[-0.03em]">
          {result.isThreat ? "Threat detected" : "No threat"}
        </p>
        <p className="shrink-0 text-lg font-medium opacity-55">
          {Math.round(result.confidence * 100)}%
        </p>
      </div>
    </div>
  );
}

function MicrophoneIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}
