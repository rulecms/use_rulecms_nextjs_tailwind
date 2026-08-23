import type { ReactNode } from 'react';
import type { GalleryWidget } from '@/lib/gallery-widgets';
import { getSourceComponent } from '@/lib/source-by-slug';
import { ComparisonHeader } from './ComparisonHeader';
import { SetupAccordion } from './SetupAccordion';

type WidgetMode = 'csr' | 'ssr';

interface ComparisonSplitProps {
  widget: GalleryWidget;
  mode: WidgetMode;
  rightPane: ReactNode;
}

export function ComparisonSplit({
  widget,
  mode,
  rightPane,
}: ComparisonSplitProps) {
  const Source = getSourceComponent(widget.slug);

  return (
    <article className="max-w-6xl">
      <SetupAccordion />
      <ComparisonHeader widget={widget} mode={mode} />
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <section className="min-w-0 flex-1 lg:pr-6">
          <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-parity-accent">
            Source component
          </h2>
          <div className="mt-3 rounded-xl border border-parity-line bg-parity-surface p-4">
            {Source ? (
              <Source />
            ) : (
              <p className="m-0 text-sm text-parity-muted">
                No host JSX is registered for <code className="font-mono">{widget.slug}</code>.
              </p>
            )}
          </div>
        </section>
        <div
          className="my-6 h-px w-full bg-parity-accent lg:mx-0 lg:my-0 lg:h-auto lg:w-0.5 lg:self-stretch"
          aria-hidden
        />
        <section className="min-w-0 flex-1 lg:pl-6">
          <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-parity-accent">
            Rendered RuleCMS widget
          </h2>
          <div className="mt-3 rounded-xl border border-parity-line bg-parity-surface p-4">
            {rightPane}
          </div>
        </section>
      </div>
    </article>
  );
}
