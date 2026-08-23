import type { Metadata } from 'next';
import Link from 'next/link';
import { galleryWidgets } from '@/lib/gallery-widgets';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <article className="max-w-3xl leading-relaxed text-parity-ink">
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-parity-accent">
        Example host app
      </p>
      <h1 className="mt-1 text-3xl font-semibold">
        Next.js gallery with host Tailwind — source vs RuleCMS widget
      </h1>
      <p className="mt-3 text-lg text-parity-muted">
        This project compiles Tailwind in the Next.js app. Each comparison page
        shows host JSX on the left and a RuleCMS widget on the right. The widget
        is DOM plus class names; CSS variables and utility definitions come from
        this host, not from RuleCMS.
      </p>
      <h2 className="mt-8 text-xl font-semibold">How to use this app</h2>
      <p className="mt-2">
        Use the <strong>left sidebar</strong> to open each widget. Names match
        the no-Tailwind gallery. The default view is server pre-fetched. Every
        widget also has a client-side view:
      </p>
      <ul className="mt-3 list-disc pl-5">
        {galleryWidgets.map((widget) => (
          <li key={widget.slug}>
            <Link className="text-parity-accent" href={`/widgets/${widget.slug}`}>
              {widget.label}
            </Link>
            {' — '}
            <Link className="text-parity-accent" href={`/widgets/${widget.slug}`}>
              server pre-fetched
            </Link>
            {' / '}
            <Link className="text-parity-accent" href={`/widgets/${widget.slug}/csr`}>
              client-side
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4">
        Expand <strong>How this comparison is set up</strong> on a widget page
        for the tutorial. Collapse it to compare the two panes. The goal is
        visual parity: the same classes on the left (scanned by Tailwind) and on
        the RuleCMS widget on the right.
      </p>
      <h2 className="mt-8 text-xl font-semibold">What this host does not do</h2>
      <ul className="mt-2 list-disc pl-5">
        <li>It does not rely on RuleCMS to compile Tailwind or emit theme CSS variables.</li>
        <li>
          It does not ship tokens or published keys. Copy{' '}
          <code className="font-mono">.env.example</code> to{' '}
          <code className="font-mono">.env.local</code>.
        </li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold">Related example</h2>
      <p className="mt-2">
        The no-Tailwind host (widget CSS comes from RuleCMS) is{' '}
        <a
          className="text-parity-accent"
          href="https://github.com/rulecms/use_rulecms_nextjs_no_tailwind"
        >
          use_rulecms_nextjs_no_tailwind
        </a>
        .
      </p>
    </article>
  );
}
