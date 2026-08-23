import {
  widgetClassNames as widget1ClassNames,
  widgetClassRules as widget1ClassRules,
  widgetCssVariables as widget1CssVariables,
} from './widget-1';

export type WidgetCssVariable = {
  name: string;
  value: string;
  source: 'theme' | 'property';
};

export type WidgetClassRule = {
  className: string;
  css: string;
};

export type GeneratedWidgetCss = {
  classNames: readonly string[];
  variables: readonly WidgetCssVariable[];
  classRules: readonly WidgetClassRule[];
};

const generatedBySlug: Record<string, GeneratedWidgetCss> = {
  'widget-1': {
    classNames: widget1ClassNames,
    variables: widget1CssVariables,
    classRules: widget1ClassRules,
  },
};

export function getGeneratedWidgetCss(
  slug: string
): GeneratedWidgetCss | undefined {
  return generatedBySlug[slug];
}
