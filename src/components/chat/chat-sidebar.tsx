/**
 * Thread list sidebar: create, switch, rename-by-first-message, delete.
 * The active thread always comes from the route param, never local state.
 */
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, MessageSquarePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/auth-context";
import {
  createConversation,
  deleteConversation,
  listConversations,
} from "@/lib/chat/conversations";
import { cn } from "@/lib/utils";

export const conversationsQueryKey = ["conversations"] as const;

export function ChatSidebar({
  activeId,
  onNavigate,
}: {
  activeId?: string;
  onNavigate?: () => void;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: conversationsQueryKey,
    queryFn: listConversations,
    enabled: Boolean(user),
  });

  const newChat = useMutation({
    mutationFn: () => createConversation(user!.id),
    onSuccess: async (conversation) => {
      await queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
      onNavigate?.();
      navigate({ to: "/chat/$conversationId", params: { conversationId: conversation.id } });
    },
    onError: () => toast.error("Could not start a new chat. Please try again."),
  });

  const removeChat = useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: async (_data, id) => {
      await queryClient.invalidateQueries({ queryKey: conversationsQueryKey });
      if (id === activeId) navigate({ to: "/chat" });
    },
    onError: () => toast.error("Could not delete that chat."),
  });

  return (
    <div className="flex h-full flex-col gap-3 border-r border-border bg-sidebar p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-1 pt-1">
        <BrandMark size="sm" />
        <ThemeToggle />
      </div>

      <Button
        onClick={() => newChat.mutate()}
        disabled={newChat.isPending || !user}
        className="w-full justify-start gap-2"
      >
        <MessageSquarePlus className="size-4" />
        New chat
      </Button>

      <ScrollArea className="-mx-1 min-h-0 flex-1 px-1">
        <nav className="flex flex-col gap-1 pb-2">
          {isLoading && (
            <p className="px-2 py-3 text-xs text-muted-foreground">Loading chats...</p>
          )}
          {!isLoading && conversations.length === 0 && (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              No conversations yet. Start one above.
            </p>
          )}
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group flex items-center gap-1 rounded-lg pr-1 transition-colors",
                conversation.id === activeId
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/60",
              )}
            >
              <Link
                to="/chat/$conversationId"
                params={{ conversationId: conversation.id }}
                onClick={onNavigate}
                className="min-w-0 flex-1 truncate px-3 py-2 text-sm"
                title={conversation.title}
              >
                {conversation.title}
              </Link>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={`Delete ${conversation.title}`}
                className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                onClick={() => removeChat.mutate(conversation.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border pt-3">
        <p className="truncate px-2 pb-2 text-xs text-muted-foreground">{user?.email}</p>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sm"
          onClick={async () => {
            await signOut();
            queryClient.clear();
            navigate({ to: "/auth" });
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
