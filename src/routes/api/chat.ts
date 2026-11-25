/**
 * Streaming chat endpoint.
 *
 * Responsibilities:
 *  - authenticate the caller (bearer token from the browser Supabase session)
 *  - verify the conversation belongs to that user
 *  - retrieve knowledge context and stream a grounded answer
 *  - persist the user message and the completed assistant message
 *
 * The AI provider is resolved through src/lib/ai/gateway.server.ts, so the
 * model/provider can change without touching this route or the frontend.
 */
import { createFileRoute } from "@tanstack/react-router";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { resolveModel, AiConfigurationError } from "@/lib/ai/gateway.server";
import { DEFAULT_MODEL_ID, isChatModelId } from "@/lib/ai/models";
import { buildSystemPrompt } from "@/lib/ai/prompt";

type ChatRequestBody = {
  messages?: UIMessage[];
  conversationId?: string;
  model?: string;
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Flattens a UIMessage into plain text for retrieval + storage. */
function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => ("text" in part && typeof part.text === "string" ? part.text : ""))
    .join("")
    .trim();
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization") ?? "";
        if (!authHeader.startsWith("Bearer ")) {
          return json({ error: "Not signed in." }, 401);
        }
        const token = authHeader.slice("Bearer ".length);

        const body = (await request.json()) as ChatRequestBody;
        const { messages, conversationId } = body;

        if (!Array.isArray(messages) || messages.length === 0) {
          return json({ error: "No messages provided." }, 400);
        }
        if (!conversationId) {
          return json({ error: "Missing conversation." }, 400);
        }

        // --- Authenticated Supabase client acting as the signed-in user ---
        const { createClient } = await import("@supabase/supabase-js");
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!supabaseUrl || !supabaseKey) {
          return json({ error: "Backend is not configured." }, 500);
        }

        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              headers.set("apikey", supabaseKey);
              headers.set("Authorization", `Bearer ${token}`);
              return fetch(input, { ...init, headers });
            },
          },
          auth: { persistSession: false, autoRefreshToken: false },
        });

        const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
        const userId = claims?.claims?.sub;
        if (claimsError || !userId) {
          return json({ error: "Your session expired. Please sign in again." }, 401);
        }

        // Ownership check - RLS also enforces this, we fail fast with a clear error.
        const { data: conversation, error: conversationError } = await supabase
          .from("conversations")
          .select("id, title")
          .eq("id", conversationId)
          .maybeSingle();

        if (conversationError || !conversation) {
          return json({ error: "Conversation not found." }, 404);
        }

        const lastMessage = messages[messages.length - 1];
        const lastUserText = messageText(lastMessage);

        // Persist the incoming user message before streaming.
        if (lastMessage.role === "user") {
          const { error: insertError } = await supabase.from("messages").insert({
            conversation_id: conversationId,
            user_id: userId,
            role: "user",
            content: lastUserText,
            client_message_id: lastMessage.id,
            parts: lastMessage.parts as never,
          });
          if (insertError) {
            console.error("[chat] failed to persist user message", insertError);
          }

          // Name the conversation from its first question.
          if (conversation.title === "New chat") {
            const title =
              lastUserText.length > 60 ? `${lastUserText.slice(0, 57)}...` : lastUserText;
            const { error: titleError } = await supabase
              .from("conversations")
              .update({ title: title || "New chat" })
              .eq("id", conversationId);
            if (titleError) console.error("[chat] failed to set title", titleError);
          }
        }

        try {
          const modelId = isChatModelId(body.model) ? body.model : DEFAULT_MODEL_ID;
          const result = streamText({
            model: resolveModel(modelId),
            system: buildSystemPrompt(lastUserText),
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            onFinish: async ({ responseMessage }) => {
              const { error } = await supabase.from("messages").insert({
                conversation_id: conversationId,
                user_id: userId,
                role: "assistant",
                content: messageText(responseMessage),
                client_message_id: responseMessage.id,
                parts: responseMessage.parts as never,
              });
              if (error) {
                console.error("[chat] failed to persist assistant message", error);
              }
              await supabase
                .from("conversations")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", conversationId);
            },
          });
        } catch (error) {
          if (error instanceof AiConfigurationError) {
            console.error("[chat] provider misconfigured", error);
            return json({ error: "The AI service is not configured yet." }, 500);
          }
          console.error("[chat] streaming failed", error);
          return json({ error: "The assistant could not respond. Please retry." }, 502);
        }
      },
    },
  },
});
