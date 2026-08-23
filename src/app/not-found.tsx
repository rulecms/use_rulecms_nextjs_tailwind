import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="max-w-xl">
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-parity-accent">
        404
      </p>
      <h1 className="mt-1 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-parity-muted">
        That route is not in this gallery. Use the sidebar or return{' '}
        <Link className="text-parity-accent" href="/">
          home
        </Link>
        .
      </p>
    </article>
  );
}
