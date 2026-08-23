import type { ComponentType } from 'react';
import { Widget1Source } from '@/components/source/widget-1-source';

/**
 * Host JSX for each gallery slug. Add a file under `src/components/source/`
 * and register it here when adding a widget.
 */
export const sourceBySlug: Record<string, ComponentType> = {
  'widget-1': Widget1Source,
};

export const sourceInfoBySlug: Record<string, string> = {
  'widget-1':
    'This block is JSX in the Next.js app. Classes such as bg-parity-accent-soft and text-parity-ink make Tailwind generate both the utilities and the CSS variables they reference.',
};

export function getSourceComponent(slug: string): ComponentType | undefined {
  return sourceBySlug[slug];
}

export function getSourceInfo(slug: string): string | undefined {
  return sourceInfoBySlug[slug];
}
