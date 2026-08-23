# Agent notes

This is a **Next.js gallery with host Tailwind**. Each widget page compares source JSX (left) with a RuleCMS widget (right). The widget does not bring CSS; Tailwind in this app does.

## Add another widget

Follow [`__docs__/RUNBOOK_add-gallery-widget.md`](./__docs__/RUNBOOK_add-gallery-widget.md). After adding source classes, run `npm run extract:widget-css` so the comparison page lists that widget’s compiled variables and utilities.

## Deploy

User-facing Vercel steps: [`VERCEL.md`](./VERCEL.md)

## Builds

Never run `npm run build` inside the tool sandbox. See `.cursor/rules/never-build-in-sandbox.mdc`.

## Token

One env var: `RULECMS_TOKEN`. Do not add `NEXT_PUBLIC_RULECMS_TOKEN`.
