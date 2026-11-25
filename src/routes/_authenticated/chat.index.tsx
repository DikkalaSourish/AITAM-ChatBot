/**
 * /chat — picks the most recent thread, or creates the first one, then
 * navigates to that thread's own URL.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { useAuth } from "@/context/auth-context";
import { createConversation, listConversations } from "@/lib/chat/conversations";

export const Route = createFileRoute("/_authenticated/chat/")({
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (!user || bootstrapped.current) return;
    bootstrapped.current = true;

    (async () => {
      const conversations = await listConversations();
      const target = conversations[0] ?? (await createConversation(user.id));
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: target.id },
        replace: true,
      });
    })();
  }, [user, navigate]);

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-muted-foreground">Opening your chat...</p>
    </div>
  );
}
