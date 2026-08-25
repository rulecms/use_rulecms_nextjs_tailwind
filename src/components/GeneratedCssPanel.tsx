import type { ReactNode } from 'react';
import { getGeneratedWidgetCss } from '@/lib/generated-tailwind';
import type { WidgetClassRule, WidgetCssVariable } from '@/lib/generated-tailwind';

const HEX = /^#(?:[0-9a-f]{3,8})$/i;
const LENGTH = /^-?[\d.]+(?:rem|px|em)$/;
const TRANSPARENT_SHADOW = /^0 0 #0000$/;

function isPaintColor(value: string) {
  return HEX.test(value) || value.startsWith('oklch(') || value.startsWith('rgb');
}

function CssAccordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-parity-line bg-parity-surface">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-parity-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          {title}
          <span className="font-normal text-parity-muted group-open:hidden">
            Expand
          </span>
          <span className="hidden font-normal text-parity-muted group-open:inline">
            Collapse
          </span>
        </span>
      </summary>
      <div className="border-t border-parity-line px-4 py-4">{children}</div>
    </details>
  );
}

function VariableRow({ variable }: { variable: WidgetCssVariable }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-parity-line bg-parity-canvas px-3 py-2">
      <VariableSwatch variable={variable} />
      <div className="min-w-0 flex-1">
        <code className="block font-mono text-sm text-parity-ink">{variable.name}</code>
        <p className="m-0 truncate font-mono text-xs text-parity-muted">{variable.value}</p>
      </div>
    </li>
  );
}

function VariableSwatch({ variable }: { variable: WidgetCssVariable }) {
  if (isPaintColor(variable.value)) {
    return (
      <span
        className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-parity-line"
        style={{ backgroundColor: variable.value }}
        title={variable.value}
        aria-hidden
      />
    );
  }

  if (TRANSPARENT_SHADOW.test(variable.value)) {
    return (
      <span
        className="h-10 w-10 shrink-0 rounded-lg bg-[repeating-conic-gradient(#e7e0d6_0%_25%,#fffcf7_0%_50%)] bg-[length:8px_8px] ring-1 ring-parity-line"
        title={variable.value}
        aria-hidden
      />
    );
  }

  if (LENGTH.test(variable.value)) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-parity-accent-soft ring-1 ring-parity-accent/30">
        <span
          className="rounded-sm bg-parity-accent"
          style={{
            width: variable.value,
            height: variable.value,
            minWidth: '2px',
            minHeight: '2px',
          }}
          aria-hidden
        />
      </span>
    );
  }

  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-parity-sidebar font-mono text-[10px] text-parity-sidebar-ink"
      aria-hidden
    >
      var
    </span>
  );
}

function ClassRuleCard({ rule }: { rule: WidgetClassRule }) {
  return (
    <li className="rounded-lg border border-parity-line bg-parity-canvas p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <code className="font-mono text-sm font-semibold text-parity-accent">
          .{rule.className}
        </code>
        <ClassPreview className={rule.className} />
      </div>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-parity-sidebar p-3 font-mono text-xs leading-relaxed text-parity-sidebar-ink">
        {rule.css}
      </pre>
    </li>
  );
}

function ClassPreview({ className }: { className: string }) {
  return (
    <div
      className="rounded-md bg-[repeating-conic-gradient(#e7e0d6_0%_25%,#fffcf7_0%_50%)] bg-[length:10px_10px] p-2"
      aria-hidden
    >
      <div className={`bg-parity-surface text-xs text-parity-ink ${className}`}>
        Aa
      </div>
    </div>
  );
}

function hostRootCss(variables: readonly WidgetCssVariable[]) {
  const body = variables.map((variable) => `  ${variable.name}: ${variable.value};`).join('\n');
  return `:root {\n${body}\n}`;
}

export function GeneratedCssPanel({ slug }: { slug: string }) {
  const generated = getGeneratedWidgetCss(slug);
  if (!generated) {
    return null;
  }

  return (
    <section className="mt-10 max-w-6xl border-t border-parity-line pt-8">
      <div className="space-y-3">
        <CssAccordion title="Minimum CSS variables required by the widget">
          <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
            {generated.variables.map((variable) => (
              <VariableRow key={variable.name} variable={variable} />
            ))}
          </ul>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-parity-sidebar p-3 font-mono text-xs leading-relaxed text-parity-sidebar-ink">
            {hostRootCss(generated.variables)}
          </pre>
        </CssAccordion>
        <CssAccordion title="Class definitions Tailwind emitted for this widget">
          <ul className="m-0 grid list-none gap-3 p-0">
            {generated.classRules.map((rule) => (
              <ClassRuleCard key={rule.className} rule={rule} />
            ))}
          </ul>
        </CssAccordion>
      </div>
    </section>
  );
}
