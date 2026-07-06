"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        We hit an unexpected snag loading this page. Please try again.
      </p>
      <Button onClick={reset} className="rounded-full">
        Try again
      </Button>
    </div>
  );
}
