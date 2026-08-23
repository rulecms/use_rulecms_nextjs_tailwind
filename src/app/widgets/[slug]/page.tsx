import type { Metadata } from 'next';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { ComparisonSplit } from '@/components/ComparisonSplit';
import { MissingCredentials } from '@/components/MissingCredentials';
import { RuleCMSWidgetPreFetched } from '@/components/RuleCMSWidgetPreFetched';
import { fetchGalleryWidget } from '@/lib/fetch-widget';
import { getWidgetBySlug } from '@/lib/gallery-widgets';
import { getPublishedKey, isWidgetConfigured } from '@/lib/rulecms-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface WidgetPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WidgetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    return { title: 'Widget' };
  }
  return { title: `${widget.label} (server pre-fetched)` };
}

export default async function WidgetSsrPage({ params }: WidgetPageProps) {
  await connection();
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    notFound();
  }

  if (!isWidgetConfigured(widget)) {
    return (
      <ComparisonSplit
        widget={widget}
        mode="ssr"
        rightPane={<MissingCredentials widget={widget} />}
      />
    );
  }

  const publishedKey = getPublishedKey(widget);
  let fetchError: string | null = null;
  let widgetData = null;

  try {
    widgetData = await fetchGalleryWidget(widget, { noStore: true });
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : 'Failed to fetch the RuleCMS widget on the server.';
  }

  return (
    <ComparisonSplit
      widget={widget}
      mode="ssr"
      rightPane={
        fetchError || !widgetData ? (
          <div className="rounded-xl bg-parity-error-bg px-4 py-3 text-parity-error">
            <h2 className="m-0 text-base font-semibold">Could not load this widget</h2>
            <p className="mt-2 text-sm">
              The server fetch using <code className="font-mono">fetchRuleCMSWidget</code>{' '}
              failed. Check the published key, <code className="font-mono">RULECMS_TOKEN</code>,
              and endpoint.
            </p>
            {fetchError ? <p className="mt-2 text-sm">{fetchError}</p> : null}
          </div>
        ) : (
          <RuleCMSWidgetPreFetched
            publishedKey={publishedKey}
            initialData={widgetData}
          />
        )
      }
    />
  );
}
