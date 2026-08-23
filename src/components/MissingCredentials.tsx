import type { GalleryWidget } from '@/lib/gallery-widgets';

interface MissingCredentialsProps {
  widget: GalleryWidget;
}

export function MissingCredentials({ widget }: MissingCredentialsProps) {
  return (
    <div className="rounded-xl bg-parity-warning-bg px-4 py-3 text-parity-warning">
      <h2 className="m-0 text-base font-semibold">Credentials are not configured</h2>
      <p className="mt-2 text-sm leading-relaxed">
        Copy <code className="font-mono">.env.example</code> to{' '}
        <code className="font-mono">.env.local</code> and set:
      </p>
      <ul className="mt-2 list-disc pl-5 text-sm">
        <li>
          <code className="font-mono">RULECMS_TOKEN</code>
        </li>
        <li>
          <code className="font-mono">{widget.publishedKeyEnv}</code>
        </li>
      </ul>
      <p className="mt-2 text-sm leading-relaxed">
        For a deployed instance, add the same names in the host platform’s
        environment-variable settings (see <code className="font-mono">VERCEL.md</code>
        ).
      </p>
    </div>
  );
}
