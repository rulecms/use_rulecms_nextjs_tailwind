import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonSplit } from '@/components/ComparisonSplit';
import { MissingCredentials } from '@/components/MissingCredentials';
import { RuleCMSWidgetClient } from '@/components/RuleCMSWidgetClient';
import { galleryWidgets, getWidgetBySlug } from '@/lib/gallery-widgets';
import { getPublishedKey, isWidgetConfigured } from '@/lib/rulecms-config';

export const dynamicParams = false;

export function generateStaticParams() {
  return galleryWidgets.map((widget) => ({ slug: widget.slug }));
}

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
  return { title: `${widget.label} (client-side)` };
}

export default async function WidgetCsrPage({ params }: WidgetPageProps) {
  const { slug } = await params;
  const widget = getWidgetBySlug(slug);
  if (!widget) {
    notFound();
  }

  const configured = isWidgetConfigured(widget);
  const publishedKey = getPublishedKey(widget);

  return (
    <ComparisonSplit
      widget={widget}
      mode="csr"
      rightPane={
        configured ? (
          <RuleCMSWidgetClient publishedKey={publishedKey} />
        ) : (
          <MissingCredentials widget={widget} />
        )
      }
    />
  );
}
