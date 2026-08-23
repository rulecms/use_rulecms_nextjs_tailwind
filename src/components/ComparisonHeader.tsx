import Link from 'next/link';
import type { GalleryWidget } from '@/lib/gallery-widgets';

type WidgetMode = 'csr' | 'ssr';

interface ComparisonHeaderProps {
  widget: GalleryWidget;
  mode: WidgetMode;
}

export function ComparisonHeader({ widget, mode }: ComparisonHeaderProps) {
  const csrHref = `/widgets/${widget.slug}`;
  const ssrHref = `/widgets/${widget.slug}/ssr`;

  return (
    <header className="mb-4">
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-parity-accent">
        {widget.label}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-parity-ink">
        {mode === 'csr' ? 'Client-side comparison' : 'Server pre-fetched comparison'}
      </h1>
      <p className="mt-2 max-w-3xl text-parity-muted">{widget.description}</p>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Rendering mode">
        <Link
          href={csrHref}
          className={
            mode === 'csr'
              ? 'rounded-full border border-parity-accent bg-parity-accent-soft px-3 py-1 text-sm font-semibold text-parity-accent'
              : 'rounded-full border border-parity-line bg-parity-surface px-3 py-1 text-sm text-parity-ink'
          }
        >
          Client-side (CSR)
        </Link>
        <Link
          href={ssrHref}
          className={
            mode === 'ssr'
              ? 'rounded-full border border-parity-accent bg-parity-accent-soft px-3 py-1 text-sm font-semibold text-parity-accent'
              : 'rounded-full border border-parity-line bg-parity-surface px-3 py-1 text-sm text-parity-ink'
          }
        >
          Server pre-fetched (SSR)
        </Link>
      </nav>
    </header>
  );
}
