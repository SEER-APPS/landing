/**
 * Hierarchical threat taxonomy — fine model labels + coarse categories.
 * Keep in sync with ai-threat-monitoring-system/training/threat_taxonomy.py
 */

export const FINE_THREAT_TYPES = [
  "scream",
  "crying",
  "gunshot",
  "explosion",
  "fight",
  "glass_break",
  "struggle",
  "siren",
  "other",
] as const;

export type FineThreatType = (typeof FINE_THREAT_TYPES)[number];

export const COARSE_THREAT_CATEGORIES = [
  "distress",
  "violence",
  "robbery",
  "kidnapping",
  "other",
] as const;

export type CoarseThreatCategory = (typeof COARSE_THREAT_CATEGORIES)[number];

/** ONNX class order including no_threat (index 0). */
export const FINE_CLASS_NAMES = ["no_threat", ...FINE_THREAT_TYPES] as const;

export const FINE_TO_COARSE: Record<string, CoarseThreatCategory> = {
  scream: "distress",
  crying: "distress",
  gunshot: "violence",
  explosion: "violence",
  fight: "violence",
  glass_break: "robbery",
  struggle: "kidnapping",
  siren: "other",
  other: "other",
  distress: "distress",
  violence: "violence",
  robbery: "robbery",
  kidnapping: "kidnapping",
  threat: "other",
};

export const FINE_DISPLAY_LABELS: Record<string, string> = {
  scream: "Scream / call for help",
  crying: "Crying / distress call",
  gunshot: "Gunshot",
  explosion: "Explosion",
  fight: "Fight / impact",
  glass_break: "Glass breaking",
  struggle: "Struggle / muffled distress",
  siren: "Siren / alarm",
  other: "Suspicious threat sound",
  distress: "Distress",
  violence: "Violence",
  robbery: "Robbery",
  kidnapping: "Kidnapping",
  threat: "Threat",
  no_threat: "No threat",
};

export function coarseCategoryForThreatType(
  threatType: string,
): CoarseThreatCategory {
  return FINE_TO_COARSE[threatType.trim().toLowerCase()] ?? "other";
}

export function displayLabelForThreatType(threatType: string): string {
  const normalized = threatType.trim().toLowerCase();
  return FINE_DISPLAY_LABELS[normalized] ?? threatType.replaceAll("_", " ");
}
