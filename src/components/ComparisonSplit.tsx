import type { ReactNode } from 'react';
import type { GalleryWidget } from '@/lib/gallery-widgets';
import { getSourceComponent, getSourceInfo } from '@/lib/source-by-slug';
import { ComparisonHeader } from './ComparisonHeader';
import { GeneratedCssPanel } from './GeneratedCssPanel';
import { SetupAccordion } from './SetupAccordion';
import { SourceInfoButton } from './SourceInfoButton';

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
  const sourceInfo = getSourceInfo(widget.slug);

  return (
    <article className="max-w-6xl">
      <SetupAccordion />
      <ComparisonHeader widget={widget} mode={mode} />
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <section className="min-w-0 flex-1 lg:pr-6">
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wider text-parity-accent">
              Source component
            </h2>
            {sourceInfo ? <SourceInfoButton message={sourceInfo} /> : null}
          </div>
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
      <GeneratedCssPanel slug={widget.slug} />
    </article>
  );
}
