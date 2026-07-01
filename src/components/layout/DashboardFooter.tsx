import { Sprout } from 'lucide-react';
import Link from 'next/link';

export function DashboardFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50" role="contentinfo">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 sm:py-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-700 text-white" aria-hidden="true">
            <Sprout className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold">
            Harvest<span className="text-primary">Link</span>
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          © {new Date().getFullYear()} HarvestLink — Investor Demo · Frontend Only
        </p>
        <nav className="flex items-center gap-4 text-xs text-muted-foreground" aria-label="Footer navigation">
          <Link href="/" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
            Home
          </Link>
          <Link href="/login" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
            Sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
}
