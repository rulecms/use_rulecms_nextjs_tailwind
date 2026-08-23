export function SetupAccordion() {
  return (
    <details className="mb-6 rounded-xl border border-parity-line bg-parity-surface">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-parity-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          How this comparison is set up
          <span className="text-parity-muted font-normal">Expand</span>
        </span>
      </summary>
      <div className="space-y-4 border-t border-parity-line px-4 py-4 text-sm leading-relaxed text-parity-ink">
        <p>
          This page is a visual parity check. The host app includes Tailwind, so
          class names used in source JSX are compiled into CSS (utilities and
          theme variables). The RuleCMS widget on the right is only DOM plus
          those same class names — it does not ship its own CSS variables or
          Tailwind layer.
        </p>
        <div>
          <h3 className="m-0 text-sm font-semibold text-parity-accent">Left — source component</h3>
          <p className="mt-1 text-parity-muted">
            Hand-written React/JSX in this Next.js repo. Tailwind scans those
            class names at build time and emits the matching CSS. Replace or
            extend the left pane when you want a new comparison.
          </p>
        </div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-parity-accent">
            Right — rendered RuleCMS widget
          </h3>
          <p className="mt-1 text-parity-muted">
            The same layout published in RuleCMS. Because the host stylesheet
            already defines the classes, the widget should look like the left
            pane when the class names match.
          </p>
        </div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-parity-accent">
            How the right pane is wired
          </h3>
          <p className="mt-1 text-parity-muted">
            One app token (<code className="font-mono">RULECMS_TOKEN</code>) and
            a published key per widget. Values live in env vars — the snippet
            below uses placeholders, not real credentials.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-parity-sidebar p-3 font-mono text-xs leading-relaxed text-parity-sidebar-ink">
            {`import { RuleCMSWidget, RuleCMSWidgetProvider } from '@rulecms/widget-react';
import * as sourceComponents from '@rulecms/source-components-react';

<RuleCMSWidgetProvider
  token={process.env.RULECMS_TOKEN}
  endpoint="https://rulecms.com"
  libraries={{ default: sourceComponents }}
>
  <RuleCMSWidget
    publishedKey="{environmentId}---widget-{widgetId}"
  />
</RuleCMSWidgetProvider>`}
          </pre>
        </div>
        <p className="text-parity-muted">
          Collapse this panel to focus on the two panes. Use the Client-side /
          Server pre-fetched links to switch how the right pane loads.
        </p>
      </div>
    </details>
  );
}
