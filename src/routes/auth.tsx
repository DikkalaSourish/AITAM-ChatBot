/**
 * Sign in / sign up. Email + password and Google (Lovable managed OAuth).
 */
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type AuthSearch = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — AITAM AI Assistant" },
      {
        name: "description",
        content:
          "Sign in to the AITAM AI Assistant to keep your campus conversations across devices.",
      },
      { property: "og:title", content: "Sign in — AITAM AI Assistant" },
      {
        property: "og:description",
        content: "Access your saved AITAM AI Assistant conversations.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { redirect } = useSearch({ from: "/auth" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const destination = redirect && redirect.startsWith("/") ? redirect : "/chat";

  useEffect(() => {
    if (session) navigate({ to: destination, replace: true });
  }, [session, destination, navigate]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (error) toast.error(error.message);
  };

  const signUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}${destination}` },
    });
    setPending(false);
    if (error) toast.error(error.message);
    else toast.success("Account created. You can start chatting now.");
  };

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: destination, replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <BrandMark size="lg" asLink={false} className="mb-6" />

        <h1 className="font-display text-2xl font-semibold text-foreground">Welcome</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Sign in to keep your AITAM conversations saved across devices.
        </p>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or use email</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>

          {(["signin", "signup"] as const).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <form
                className="space-y-4 pt-4"
                onSubmit={tab === "signin" ? signIn : signUp}
              >
                <div className="space-y-2">
                  <Label htmlFor={`${tab}-email`}>Email</Label>
                  <Input
                    id={`${tab}-email`}
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${tab}-password`}>Password</Label>
                  <Input
                    id={`${tab}-password`}
                    type="password"
                    autoComplete={tab === "signin" ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {tab === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
