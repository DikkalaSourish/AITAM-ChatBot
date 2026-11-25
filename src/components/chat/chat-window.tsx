/**
 * The chat transcript + composer for one conversation thread.
 * Keyed by conversationId by the route so messages never bleed between threads.
 */
import { useChat } from "@ai-sdk/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { BrandMark } from "@/components/brand-mark";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { conversationsQueryKey } from "@/components/chat/chat-sidebar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { listMessages } from "@/lib/chat/conversations";

const SUGGESTIONS = [
  "What courses does AITAM offer?",
  "How do admissions work for B.Tech?",
  "Tell me about placements and training",
  "What hostel and transport facilities are there?",
];

function messageText(message: UIMessage) {
  return message.parts
    .map((part) => ("text" in part && typeof part.text === "string" ? part.text : ""))
    .join("");
}

/** Loads persisted history first, then mounts the chat with it as the seed. */
export function ChatWindow({ conversationId }: { conversationId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => listMessages(conversationId),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading conversation...</p>
      </div>
    );
  }

  return <ChatThreadView conversationId={conversationId} initialMessages={data ?? []} />;
}

function ChatThreadView({
  conversationId,
  initialMessages,
}: {
  conversationId: string;
  initialMessages: UIMessage[];
}) {
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      // Bearer token is read per request so it is never stale after a refresh.
      fetch: async (input, init) => {
        const { data } = await supabase.auth.getSession();
        const headers = new Headers(init?.headers);
        if (data.session) headers.set("Authorization", `Bearer ${data.session.access_token}`);
        return fetch(input, { ...init, headers });
      },
      body: { conversationId },
    }),
    onError: (chatError) => {
      toast.error(chatError.message || "The assistant could not respond.");
    },
    onFinish: () => {
      queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
    },
  });

  const busy = status === "submitted" || status === "streaming";

  // Keep the composer focused across mount, thread switches and stream end.
  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy, conversationId]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    sendMessage({ text: trimmed });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-10 text-center sm:py-16">
              <BrandMark size="lg" withText={false} asLink={false} />
              <div className="space-y-2">
                <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  How can I help you with AITAM today?
                </h1>
                <p className="mx-auto max-w-md text-sm text-muted-foreground">
                  Ask about courses, admissions, departments, placements, hostel, transport,
                  library, clubs, events or exams.
                </p>
              </div>
              <div className="grid w-full max-w-xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="h-auto justify-start rounded-xl px-4 py-3 text-left text-sm whitespace-normal"
                    onClick={() => submit(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent
                className={
                  message.role === "user"
                    ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                    : "text-foreground"
                }
              >
                <MessageResponse>{messageText(message)}</MessageResponse>
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Thinking...</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && (
            <p className="text-sm text-destructive">
              {error.message || "Something went wrong. Please try again."}
            </p>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <PromptInput
            onSubmit={(message: PromptInputMessage) => submit(message.text ?? input)}
            globalDrop={false}
            multiple={false}
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about AITAM courses, admissions, placements..."
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={busy || input.trim().length === 0} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AITAM AI Assistant can make mistakes. Verify fees, dates and results on
            aitam.ac.in.
          </p>
        </div>
      </div>
    </div>
  );
}
