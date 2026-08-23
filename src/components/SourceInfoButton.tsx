'use client';

import { useRef } from 'react';

interface SourceInfoButtonProps {
  message: string;
}

export function SourceInfoButton({ message }: SourceInfoButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-parity-accent ring-1 ring-parity-accent/30 hover:bg-parity-accent-soft"
        aria-label="About this source component"
        onClick={() => dialogRef.current?.showModal()}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6" strokeLinecap="round" />
          <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        className="w-[min(32rem,calc(100vw-2rem))] rounded-xl border border-parity-line bg-parity-surface p-4 text-parity-ink shadow-lg backdrop:bg-parity-ink/40"
      >
        <p className="m-0 text-sm leading-relaxed">{message}</p>
        <form method="dialog" className="mt-4 text-right">
          <button
            type="submit"
            className="rounded-full bg-parity-accent px-3 py-1 text-sm text-white"
          >
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
