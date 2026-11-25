/**
 * Conversation + message data access (browser, RLS-scoped to the signed-in user).
 */
import type { UIMessage } from "ai";

import { supabase } from "@/integrations/supabase/client";

export type Conversation = {
  id: string;
  title: string;
  updated_at: string;
};

export async function listConversations(): Promise<Conversation[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("id, title, updated_at")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createConversation(userId: string): Promise<Conversation> {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId, title: "New chat" })
    .select("id, title, updated_at")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteConversation(id: string): Promise<void> {
  const { error } = await supabase.from("conversations").delete().eq("id", id);
  if (error) throw error;
}

export async function renameConversation(id: string, title: string): Promise<void> {
  const { error } = await supabase.from("conversations").update({ title }).eq("id", id);
  if (error) throw error;
}

/** Loads a thread's persisted messages back into AI SDK UIMessage shape. */
export async function listMessages(conversationId: string): Promise<UIMessage[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("id, role, content, client_message_id, parts, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((row) => {
    const parts = Array.isArray(row.parts) ? row.parts : null;
    return {
      id: row.client_message_id ?? row.id,
      role: row.role as UIMessage["role"],
      parts: (parts ?? [{ type: "text", text: row.content }]) as UIMessage["parts"],
    } satisfies UIMessage;
  });
}
