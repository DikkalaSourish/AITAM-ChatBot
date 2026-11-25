import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

import { DEFAULT_MODEL_ID, type ChatModelId } from "./models";

export class AiConfigurationError extends Error {}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export function resolveModel(
  modelId: ChatModelId = DEFAULT_MODEL_ID,
): LanguageModel {
  if (!process.env.GEMINI_API_KEY) {
    throw new AiConfigurationError(
      "Missing GEMINI_API_KEY for Gemini",
    );
  }

  switch (modelId) {
    case "google/gemini-3.6-flash":
      return google("gemini-3.6-flash");

    default:
      throw new AiConfigurationError(
        `Unsupported Gemini model: ${modelId}`,
      );
  }
}