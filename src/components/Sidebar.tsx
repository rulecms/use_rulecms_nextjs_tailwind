'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { galleryWidgets } from '@/lib/gallery-widgets';

function navClass(active: boolean, nested = false) {
  const base = nested
    ? 'block rounded-lg py-2 pr-3 pl-4 text-sm'
    : 'block rounded-lg px-3 py-2 text-sm';
  return active
    ? `${base} bg-parity-accent/35 text-parity-sidebar-ink`
    : `${base} text-parity-sidebar-ink hover:bg-white/10`;
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="fixed top-3 left-3 z-30 rounded-lg border border-parity-line bg-parity-surface px-3 py-1.5 text-sm text-parity-ink lg:hidden"
        aria-expanded={open}
        aria-controls="gallery-sidebar"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close menu' : 'Open menu'}
      </button>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-20 border-0 bg-parity-ink/45 lg:hidden"
          aria-label="Close menu"
          onClick={close}
        />
      ) : null}
      <aside
        id="gallery-sidebar"
        className={`flex min-h-screen w-72 shrink-0 flex-col bg-parity-sidebar px-4 py-6 text-parity-sidebar-ink max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-[25] max-lg:h-screen max-lg:transition-transform ${
          open ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[105%]'
        }`}
      >
        <Link href="/" onClick={close} className="mb-7 flex items-center gap-3 no-underline">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-parity-accent text-xs font-bold tracking-wide">
            RC
          </span>
          <span>
            <strong className="block text-sm">RuleCMS gallery</strong>
            <span className="mt-0.5 block text-xs text-parity-sidebar-muted">
              Next.js, host Tailwind
            </span>
          </span>
        </Link>
        <nav className="flex flex-col gap-0.5" aria-label="Gallery">
          <Link href="/" onClick={close} className={navClass(pathname === '/')}>
            Home
          </Link>
          <p className="mt-5 mb-1 px-3 text-[0.7rem] tracking-[0.12em] text-parity-sidebar-muted uppercase">
            Widgets
          </p>
          {galleryWidgets.map((widget) => {
            const ssrHref = `/widgets/${widget.slug}`;
            const csrHref = `/widgets/${widget.slug}/csr`;
            return (
              <div key={widget.slug} className="mb-2">
                <span className="block px-3 pt-1 pb-0.5 text-xs text-parity-sidebar-muted">
                  {widget.label}
                </span>
                <Link href={ssrHref} onClick={close} className={navClass(pathname === ssrHref, true)}>
                  Server pre-fetched
                </Link>
                <Link href={csrHref} onClick={close} className={navClass(pathname === csrHref, true)}>
                  Client-side
                </Link>
              </div>
            );
          })}
        </nav>
        <p className="mt-auto pt-6 text-xs leading-relaxed text-parity-sidebar-muted">
          Each widget page compares host JSX on the left with a RuleCMS widget on
          the right. Names match the no-Tailwind gallery.
        </p>
      </aside>
    </>
  );
}
