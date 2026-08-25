/**
 * Single source of truth for gallery widgets.
 *
 * Adding a widget: append an entry here, add a source JSX file, register it in
 * `source-by-slug.ts`, and add the env var to `.env.example` + `VERCEL.md`.
 * See `__docs__/RUNBOOK_add-gallery-widget.md`.
 */
export interface GalleryWidget {
  /** URL segment under `/widgets/`, e.g. `widget-1`. */
  slug: string;
  /** Sidebar label and page heading. */
  label: string;
  /** Short purpose shown on the widget pages. */
  description: string;
  /** Env var for this widget’s published key. */
  publishedKeyEnv: string;
}

export const galleryWidgets: GalleryWidget[] = [
  {
    slug: 'widget-1',
    label: 'Widget 1',
    description:
      'Compare host JSX (left) with the RuleCMS widget (right). Both use the same Tailwind classes compiled by this host.',
    publishedKeyEnv: 'RULECMS_WIDGET_1_PUBLISHED_KEY',
  },
  {
    slug: 'widget-2',
    label: 'Widget 2',
    description:
      'Compare host JSX (left) with the RuleCMS widget (right). Both use stock Tailwind classes only — no project theme colors.',
    publishedKeyEnv: 'RULECMS_WIDGET_2_PUBLISHED_KEY',
  },
];

export function getWidgetBySlug(slug: string): GalleryWidget | undefined {
  return galleryWidgets.find((widget) => widget.slug === slug);
}
