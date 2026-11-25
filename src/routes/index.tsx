import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Bus,
  Building2,
  CalendarDays,
  FlaskConical,
  GraduationCap,
  Users,
  Briefcase,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AITAM AI Assistant — Ask anything about AITAM" },
      {
        name: "description",
        content:
          "The official AI assistant for Aditya Institute of Technology and Management: courses, admissions, departments, placements, hostel, transport and campus life.",
      },
      { property: "og:title", content: "AITAM AI Assistant" },
      {
        property: "og:description",
        content:
          "Instant, grounded answers about AITAM courses, admissions, placements and campus facilities.",
      },
    ],
  }),
  component: Landing,
});

const TOPICS = [
  { icon: GraduationCap, label: "Courses & departments" },
  { icon: BookOpen, label: "Admissions & eligibility" },
  { icon: Briefcase, label: "Placements & training" },
  { icon: Building2, label: "Hostel & facilities" },
  { icon: Bus, label: "Transport routes" },
  { icon: FlaskConical, label: "Labs & research" },
  { icon: Users, label: "Clubs & student life" },
  { icon: CalendarDays, label: "Exams & calendar" },
];

function Landing() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-hero">
      <header className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 sm:px-6">
        <BrandMark />
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to={session ? "/chat" : "/auth"}>
              {session ? "Open chat" : "Sign in"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <section className="py-14 text-center sm:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Aditya Institute of Technology and Management
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-[1.1] font-semibold text-balance text-foreground sm:text-6xl">
            Every answer about AITAM, in one conversation
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Ask about courses, admissions, departments, placements, hostel, transport,
            library, labs, clubs, events and examinations — answered instantly, grounded in
            college information.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to={session ? "/chat" : "/auth"}>Start chatting</Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="topics" className="pb-8">
          <h2 id="topics" className="sr-only">
            Topics the assistant covers
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOPICS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft"
              >
                <Icon className="size-5 shrink-0 text-primary" />
                <span className="min-w-0 text-sm font-medium text-card-foreground">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          Unofficial figures change yearly — always confirm fees, dates and results on
          aitam.ac.in.
        </p>
      </footer>
    </div>
  );
}
