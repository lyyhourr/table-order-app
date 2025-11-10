import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-[140px] font-bold leading-none tracking-tighter text-foreground sm:text-[200px] md:text-[240px] animate-bounce">
            404
          </h1>
        </div>

        <div className="mb-8 space-y-4 animate-fade-in-up">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Page not found
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="mx-auto mb-8 h-px w-24 bg-border" />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in-up">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 animate-fade-in-up">
          <p className="text-sm text-muted-foreground">
            Need help?
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute -right-[10%] -top-[10%] h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>
    </div>
  );
}
