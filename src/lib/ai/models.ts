/**
 * Gemini models used by the AITAM Assistant.
 */

export const CHAT_MODELS = {
  "google/gemini-3.6-flash": {
    label: "Gemini 3.6 Flash",
    description: "Fast and capable answers for AITAM campus questions.",
  },
} as const;

export type ChatModelId = keyof typeof CHAT_MODELS;

export const DEFAULT_MODEL_ID: ChatModelId =
  "google/gemini-3.6-flash";

export function isChatModelId(
  value: unknown,
): value is ChatModelId {
  return typeof value === "string" && value in CHAT_MODELS;
}