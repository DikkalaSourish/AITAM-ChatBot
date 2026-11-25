import { createFileRoute } from "@tanstack/react-router";

import { ChatWindow } from "@/components/chat/chat-window";

export const Route = createFileRoute("/_authenticated/chat/$conversationId")({
  component: ChatThread,
});

function ChatThread() {
  const { conversationId } = Route.useParams();
  // Key by thread id so state never bleeds between conversations.
  return <ChatWindow key={conversationId} conversationId={conversationId} />;
}
