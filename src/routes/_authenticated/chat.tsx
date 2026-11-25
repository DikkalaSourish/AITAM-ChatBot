import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [
      { title: "Chat — AITAM AI Assistant" },
      {
        name: "description",
        content:
          "Ask the AITAM AI Assistant about courses, admissions, placements, hostel, transport and campus life.",
      },
      { property: "og:title", content: "Chat — AITAM AI Assistant" },
      {
        property: "og:description",
        content: "Your conversations with the AITAM AI Assistant.",
      },
    ],
  }),
  component: ChatLayout,
});

function ChatLayout() {
  const params = useParams({ strict: false }) as { conversationId?: string };
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside className="hidden w-72 shrink-0 md:block">
        <ChatSidebar activeId={params.conversationId} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-b border-border px-3 py-2 md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open chats">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <ChatSidebar
                activeId={params.conversationId}
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <BrandMark size="sm" withText={false} asLink={false} className="justify-self-start" />
        </header>

        <main className="min-h-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
