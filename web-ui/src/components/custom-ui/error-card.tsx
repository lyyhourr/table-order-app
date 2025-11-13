"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

type ErrorCardProps = {
  message?: string;
  children?: React.ReactNode;
};

export default function ErrorCard({
  message = "Something went wrong. Please try again or return home.",
  children,
}: ErrorCardProps) {
  return (
    <Card className="max-w-lg mx-auto mt-12 shadow-lg">
      <CardHeader className="flex items-center gap-3">
        <AlertCircle className="h-6 w-6" />
        <CardTitle className="text-lg">Error</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{message}</p>

        {children && (
          <div className="rounded-md border p-3 text-sm bg-muted/40">
            {children}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Go home">
            <Button variant="ghost">Go Home</Button>
          </Link>

          <Button
            onClick={() => {
              if (typeof window !== "undefined") window.location.reload();
            }}
          >
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
