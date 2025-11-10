"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 inline-flex animate-fade-in">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle
              className="h-20 w-20 text-destructive"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="mb-8 space-y-4 animate-fade-in-up">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {"Something went wrong"}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {
              "We encountered an unexpected error. Don't worry, our team has been notified and we're working on it."
            }
          </p>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mb-8 rounded-lg border border-border bg-card p-4 text-left animate-fade-in-up">
            <p className="font-mono text-sm text-card-foreground wrap-break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {"Error ID: "}
                {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mx-auto mb-8 h-px w-24 bg-border" />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in-up">
          <Button onClick={reset} size="lg" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            {"Try Again"}
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 bg-transparent"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 animate-fade-in-up">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              contact support
            </Link>
          </p>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute -right-[10%] -top-[10%] h-96 w-96 rounded-full bg-destructive/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
    </div>
  );
}
