/**
 * Host-side source for Widget 1. Tailwind scans these class names and emits
 * utilities plus `@theme` CSS variables. The RuleCMS widget on the right
 * should use the same classes so both panes share this stylesheet.
 */
export function Widget1Source() {
  return (
    <div className="rounded-xl bg-parity-accent-soft px-4 py-3 text-parity-ink shadow-sm ring-1 ring-parity-accent/30">
      <p className="text-sm font-semibold uppercase tracking-wide text-parity-accent">
        Host source
      </p>
      <p className="mt-2 text-base leading-relaxed text-parity-ink">
        This block is JSX in the Next.js app. Classes such as{' '}
        <code className="rounded bg-parity-surface px-1 font-mono text-sm text-parity-accent">
          bg-parity-accent-soft
        </code>{' '}
        and{' '}
        <code className="rounded bg-parity-surface px-1 font-mono text-sm text-parity-accent">
          text-parity-ink
        </code>{' '}
        make Tailwind generate both the utilities and the CSS variables they
        reference.
      </p>
    </div>
  );
}
