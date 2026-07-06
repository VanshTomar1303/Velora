"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-center text-white">
        <h1 className="text-2xl">Something went wrong</h1>
        <button onClick={reset} className="rounded-full border border-white/30 px-6 py-2 text-sm">
          Try again
        </button>
      </body>
    </html>
  );
}
