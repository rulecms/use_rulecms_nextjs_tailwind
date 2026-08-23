import type { ComponentType } from 'react';
import { Widget1Source } from '@/components/source/widget-1-source';

/**
 * Host JSX for each gallery slug. Add a file under `src/components/source/`
 * and register it here when adding a widget.
 */
export const sourceBySlug: Record<string, ComponentType> = {
  'widget-1': Widget1Source,
};

export function getSourceComponent(slug: string): ComponentType | undefined {
  return sourceBySlug[slug];
}
