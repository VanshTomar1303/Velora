import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="font-display text-6xl text-primary">404</span>
      <h1 className="font-display text-2xl">This table isn&apos;t set</h1>
      <p className="max-w-md text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild className="rounded-full">
        <Link href="/">Back to Velora</Link>
      </Button>
    </div>
  );
}
