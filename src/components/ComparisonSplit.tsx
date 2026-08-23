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
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="flex min-h-6 items-center gap-2 lg:col-start-1 lg:row-start-1 lg:pr-6">
          <h2 className="m-0 text-sm leading-none font-semibold uppercase tracking-wider text-parity-accent">
            Source component
          </h2>
          {sourceInfo ? <SourceInfoButton message={sourceInfo} /> : null}
        </div>
        <div className="mt-3 rounded-xl border border-parity-line bg-parity-surface p-4 lg:col-start-1 lg:row-start-2 lg:mt-3 lg:pr-6">
          {Source ? (
            <Source />
          ) : (
            <p className="m-0 text-sm text-parity-muted">
              No host JSX is registered for <code className="font-mono">{widget.slug}</code>.
            </p>
          )}
        </div>
        <div
          className="my-6 h-px w-full bg-parity-accent lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:my-0 lg:h-auto lg:w-0.5 lg:self-stretch"
          aria-hidden
        />
        <div className="flex min-h-6 items-center lg:col-start-3 lg:row-start-1 lg:pl-6">
          <h2 className="m-0 text-sm leading-none font-semibold uppercase tracking-wider text-parity-accent">
            Rendered RuleCMS widget
          </h2>
        </div>
        <div className="mt-3 rounded-xl border border-parity-line bg-parity-surface p-4 lg:col-start-3 lg:row-start-2 lg:mt-3 lg:pl-6">
          {rightPane}
        </div>
      </div>
      <GeneratedCssPanel slug={widget.slug} />
    </article>
  );
}
