/**
 * Knowledge retrieval layer.
 *
 * Today this is a deterministic keyword/BM25-ish scorer over the in-memory
 * knowledge base. The `retrieve()` signature is intentionally the same one a
 * vector-store retriever would expose, so swapping in embeddings + pgvector
 * later is a drop-in replacement for this file only.
 */
import { KNOWLEDGE_BASE, type KnowledgeDocument } from "./aitam";
import { FACULTY_KNOWLEDGE } from "./faculty";
const ALL_KNOWLEDGE: KnowledgeDocument[] = [
  ...KNOWLEDGE_BASE,
  ...FACULTY_KNOWLEDGE,
];

export type RetrievedChunk = {
  document: KnowledgeDocument;
  score: number;
};

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "of", "to", "in", "on", "for",
  "and", "or", "what", "which", "who", "how", "do", "does", "can", "i", "me",
  "my", "about", "at", "it", "this", "that", "with", "please", "tell", "give",
  "there", "any", "you", "your", "we", "us", "aitam", "college",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.&]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function scoreDocument(doc: KnowledgeDocument, tokens: string[]): number {
  const haystackTitle = `${doc.title} ${doc.category}`.toLowerCase();
  const haystackKeywords = doc.keywords.join(" ").toLowerCase();
  const haystackContent = doc.content.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (haystackKeywords.includes(token)) score += 5;
    if (haystackTitle.includes(token)) score += 4;
    const occurrences = haystackContent.split(token).length - 1;
    score += Math.min(occurrences, 4);
  }
  return score;
}

export type RetrieveOptions = {
  /** Maximum number of documents returned. */
  limit?: number;
  /** Minimum score required for a document to be considered relevant. */
  minScore?: number;
};

/**
 * Returns the knowledge documents most relevant to a natural language query.
 * Falls back to the general overview + contact docs when nothing matches, so
 * the model always has grounding context.
 */
export function retrieve(query: string, options: RetrieveOptions = {}): RetrievedChunk[] {
  const { limit = 4, minScore = 3 } = options;
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return KNOWLEDGE_BASE.filter((doc) => doc.id === "overview").map((document) => ({
      document,
      score: 1,
    }));
  }

  const ranked = ALL_KNOWLEDGE.map((document) => ({
    document,
    score: scoreDocument(document, tokens),
  }))
    .filter((chunk) => chunk.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (ranked.length > 0) return ranked;

  return ALL_KNOWLEDGE.filter((doc) => doc.id === "overview" || doc.id === "contact").map(
    (document) => ({ document, score: 0 }),
  );
}

/** Formats retrieved documents into a context block for the system prompt. */
export function formatContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (chunk, index) =>
        `[Source ${index + 1}: ${chunk.document.title}]\n${chunk.document.content}`,
    )
    .join("\n\n---\n\n");
}
