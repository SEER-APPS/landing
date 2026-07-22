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
  type WindowAnalysis,
} from "@/lib/threatInference";

/** Matches `operating_threshold_fpr15` in public/models/seer-1.meta.json. */
const primaryModel: ThreatModelDefinition = {
  name: "Seer 1",
  path: "/models/seer-1.onnx",
  threshold: 0.961,
};

const comparisonModel: ThreatModelDefinition = {
  name: "Seer 2",
  path: "/models/seer-2.onnx",
  threshold: 0.961,
};

type Mode = "live" | "file";
type PanelView = "summary" | "details" | "compare";

type DetectionEvent = {
  id: string;
  startSec: number;
  label: string;
  scores: Array<{
    modelName: string;
    confidence: number;
    isThreat: boolean;
    label?: string;
    threatType?: string | null;
    threatCategory?: string | null;
  }>;
};

export function ProtectionConsole({
  showComparison,
}: {
  showComparison: boolean;
}) {
  const [mode, setMode] = useState<Mode>("live");
  const [panelView, setPanelView] = useState<PanelView>("summary");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [results, setResults] = useState<ThreatResult[]>([]);
  const [detections, setDetections] = useState<DetectionEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const liveSamplesRef = useRef<number[]>([]);
  const liveOffsetRef = useRef(0);
  const inferenceActiveRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const models = useMemo(
    () => (showComparison ? [primaryModel, comparisonModel] : [primaryModel]),
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

  const appendWindows = useCallback(
    (windows: WindowAnalysis[], offsetSec = 0) => {
      const nextEvents = windowsToDetections(windows, offsetSec);
      if (nextEvents.length === 0) {
        return;
      }
      setDetections((current) => [...current, ...nextEvents].slice(-80));
    },
    [],
  );

  const runDetection = useCallback(
    async (samples: Float32Array, options?: { replace?: boolean; offsetSec?: number }) => {
      if (inferenceActiveRef.current) {
        return;
      }

      inferenceActiveRef.current = true;
      setIsProcessing(true);
      setError(null);
      try {
        const report = await classifyAudio(samples, models);
        setResults(report.summary);
        if (options?.replace) {
          setDetections(windowsToDetections(report.windows, options.offsetSec ?? 0));
        } else {
          appendWindows(report.windows, options?.offsetSec ?? 0);
        }
        if (
          report.summary.length > 0 &&
          report.summary.every((result) => Boolean(result.error))
        ) {
          setError("Detection unavailable");
        }
      } catch (caughtError) {
        console.error("Threat detection failed", caughtError);
        setError("Detection unavailable");
      } finally {
        inferenceActiveRef.current = false;
        setIsProcessing(false);
      }
    },
    [appendWindows, models],
  );

  const startListening = async () => {
    setError(null);
    setResults([]);
    setDetections([]);
    setPanelView("summary");
    liveOffsetRef.current = 0;

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
          const offsetSec = liveOffsetRef.current;
          liveOffsetRef.current += 1;
          void runDetection(resampled, { offsetSec });
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
    setDetections([]);
    setPanelView("summary");
    setError(null);
    setIsProcessing(true);

    const audioContext = new AudioContext();
    try {
      const encodedAudio = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(encodedAudio);
      await runDetection(downmixAudioBuffer(audioBuffer), { replace: true });
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
    setDetections([]);
    setPanelView("summary");
    setError(null);
  };

  const threatEvents = useMemo(
    () => detections.filter((event) => event.scores.some((score) => score.isThreat)),
    [detections],
  );

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

      <div className="grid flex-1 gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
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

        <div className="flex max-h-[min(75vh,56rem)] min-h-[26rem] flex-col overflow-hidden rounded-[2rem] border border-border bg-foreground p-6 text-background sm:p-8">
          {panelView === "summary" ? (
            <SummaryPanel
              error={error}
              isListening={isListening}
              isProcessing={isProcessing}
              results={results}
              showComparison={showComparison}
              hasDetails={threatEvents.length > 0 || detections.length > 0}
              onViewDetails={() => setPanelView("details")}
            />
          ) : panelView === "details" ? (
            <DetailsPanel
              detections={threatEvents.length > 0 ? threatEvents : detections}
              showComparison={showComparison}
              onBack={() => setPanelView("summary")}
              onCompare={() => setPanelView("compare")}
            />
          ) : (
            <ComparePanel
              detections={threatEvents.length > 0 ? threatEvents : detections}
              models={models}
              onBack={() => setPanelView("details")}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function windowsToDetections(
  windows: WindowAnalysis[],
  offsetSec: number,
): DetectionEvent[] {
  return windows.flatMap((windowAnalysis) => {
    const scores = windowAnalysis.scores
      .filter((score) => !score.error)
      .map((score) => ({
        modelName: score.modelName,
        confidence: score.confidence,
        isThreat: score.isThreat,
        label: score.label,
        threatType: score.threatType,
        threatCategory: score.threatCategory,
      }));
    if (scores.length === 0) {
      return [];
    }

    const peak = Math.max(...scores.map((score) => score.confidence));
    const anyThreat = scores.some((score) => score.isThreat);
    // Below calibrated FPR15 band — ignore as noise for the timeline.
    if (!anyThreat && peak < 0.9) {
      return [];
    }

    return [
      {
        id: `${offsetSec + windowAnalysis.startSec}-${peak.toFixed(3)}`,
        startSec: offsetSec + windowAnalysis.startSec,
        label: labelForScores(scores),
        scores,
      } satisfies DetectionEvent,
    ];
  });
}

function labelForScores(
  scores: DetectionEvent["scores"],
): string {
  const threatScore = scores.find((score) => score.isThreat && score.label);
  if (threatScore?.label) {
    return threatScore.label;
  }
  if (scores.some((score) => score.isThreat)) {
    return "Threat";
  }
  return "Elevated";
}

function SummaryPanel({
  error,
  isListening,
  isProcessing,
  results,
  showComparison,
  hasDetails,
  onViewDetails,
}: {
  error: string | null;
  isListening: boolean;
  isProcessing: boolean;
  results: ThreatResult[];
  showComparison: boolean;
  hasDetails: boolean;
  onViewDetails: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between">
        <span className="text-sm font-medium opacity-65">Result</span>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isListening ? "animate-pulse bg-emerald-400" : "bg-background/25"
          }`}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 py-8">
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
      {hasDetails && (
        <button
          type="button"
          className="mt-auto inline-flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-xl bg-background/10 px-4 text-sm font-semibold transition-colors hover:bg-background/15"
          onClick={onViewDetails}
        >
          <span>View details</span>
          <ChevronIcon direction="right" />
        </button>
      )}
    </div>
  );
}

function DetailsPanel({
  detections,
  showComparison,
  onBack,
  onCompare,
}: {
  detections: DetectionEvent[];
  showComparison: boolean;
  onBack: () => void;
  onCompare: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="mb-5 flex shrink-0 items-center justify-between gap-3">
        <CircleIconButton label="Back" onClick={onBack}>
          <ChevronIcon direction="left" />
        </CircleIconButton>
        {showComparison && (
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-background/10 px-4 text-sm font-semibold transition-colors hover:bg-background/15"
            onClick={onCompare}
          >
            <span>Compare</span>
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]">
        {detections.length === 0 ? (
          <p className="text-2xl font-semibold tracking-tight opacity-35">
            No detections
          </p>
        ) : (
          detections.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl bg-background/8 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold tracking-tight">
                    {event.label}
                  </p>
                  <p className="mt-1 text-xs font-medium opacity-45">
                    {formatTimestamp(event.startSec)}
                  </p>
                </div>
                <div className="text-right">
                  {event.scores.map((score) => (
                    <p
                      key={score.modelName}
                      className="text-sm font-semibold opacity-80"
                    >
                      {event.scores.length > 1 ? `${score.modelName} ` : ""}
                      {Math.round(score.confidence * 100)}%
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ComparePanel({
  detections,
  models,
  onBack,
}: {
  detections: DetectionEvent[];
  models: ThreatModelDefinition[];
  onBack: () => void;
}) {
  const chartRows = useMemo(() => {
    const labels = Array.from(new Set(detections.map((event) => event.label)));
    return labels.map((label) => {
      const matching = detections.filter((event) => event.label === label);
      return {
        label,
        values: models.map((model) => {
          const confidences = matching
            .map(
              (event) =>
                event.scores.find((score) => score.modelName === model.name)
                  ?.confidence ?? 0,
            )
            .filter((confidence) => confidence > 0);
          const average =
            confidences.length === 0
              ? 0
              : confidences.reduce((total, value) => total + value, 0) /
                confidences.length;
          return {
            modelName: model.name,
            value: average,
          };
        }),
      };
    });
  }, [detections, models]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="mb-5 shrink-0">
        <CircleIconButton label="Back" onClick={onBack}>
          <ChevronIcon direction="left" />
        </CircleIconButton>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]">
        {chartRows.length === 0 ? (
          <p className="text-2xl font-semibold tracking-tight opacity-35">
            No detections
          </p>
        ) : (
          chartRows.map((row) => (
            <div key={row.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{row.label}</p>
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-45">
                  {row.values.map((value) => (
                    <span key={value.modelName}>{value.modelName}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {row.values.map((value, index) => (
                  <div key={value.modelName} className="flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-background/15">
                      <div
                        className={`h-full rounded-full ${
                          index === 0 ? "bg-brand" : "bg-background/55"
                        }`}
                        style={{
                          width: `${Math.max(4, Math.round(value.value * 100))}%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm font-semibold opacity-70">
                      {Math.round(value.value * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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
        <div className="min-w-0">
          <p className="text-2xl font-semibold tracking-[-0.03em]">
            {result.error
              ? result.error
              : result.isThreat
                ? (result.label ?? "Threat detected")
                : "No threat"}
          </p>
          {result.isThreat && result.threatCategory && !result.error && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] opacity-45">
              {result.threatCategory}
            </p>
          )}
        </div>
        {!result.error && (
          <p className="shrink-0 text-lg font-medium opacity-55">
            {Math.round(result.confidence * 100)}%
          </p>
        )}
      </div>
    </div>
  );
}

function CircleIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/12 text-background transition-colors hover:bg-background/18"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function formatTimestamp(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
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
