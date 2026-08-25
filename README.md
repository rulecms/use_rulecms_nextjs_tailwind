# RuleCMS widget gallery — Next.js, host Tailwind

A Next.js host that **includes Tailwind**. Each widget page is a comparison:

- **Left — source component:** hand-written JSX in this repo. Tailwind scans those class names and emits utilities plus theme CSS variables.
- **Right — rendered RuleCMS widget:** DOM from RuleCMS with the same class names. It does not depend on RuleCMS for CSS variables or utility definitions.

Use the sidebar to open each widget. Names match [use_rulecms_nextjs_no_tailwind](https://github.com/rulecms/use_rulecms_nextjs_no_tailwind). Start with Widget 1. Add more with the [add-widget runbook](__docs__/RUNBOOK_add-gallery-widget.md).

The no-Tailwind gallery (widget CSS comes from RuleCMS) is a separate repo.

## Live demo

**[View the live demo](https://use-rulecms-nextjs-tailwind.vercel.app/)**

## Quick start

```bash
git clone https://github.com/rulecms/use_rulecms_nextjs_tailwind.git
cd use_rulecms_nextjs_tailwind
npm install
cp .env.example .env.local
```

Fill in `.env.local`, then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On a widget page, expand **How this comparison is set up** for the tutorial; collapse it to compare the two panes.

To deploy a hosted instance, follow [VERCEL.md](./VERCEL.md).

## Environment variables

This repository does **not** commit tokens or published keys.

| Name | Used by |
| --- | --- |
| `RULECMS_TOKEN` | The one RuleCMS app token. Client-side and server pre-fetched. |
| `RULECMS_WIDGET_1_PUBLISHED_KEY` | Widget 1 published key |
| `RULECMS_WIDGET_2_PUBLISHED_KEY` | Widget 2 published key |

## Routes

| Route | What it shows |
| --- | --- |
| `/` | Purpose of this gallery |
| `/widgets/widget-1` | Left: source JSX. Right: server pre-fetched widget |
| `/widgets/widget-1/csr` | Same split; right pane is client-side |
| `/widgets/widget-2` | Same split; stock Tailwind only (no project theme colors) |
| `/widgets/widget-2/csr` | Widget 2, client-side |

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run extract:widget-css
```

`extract:widget-css` recompiles `globals.css` through Tailwind/PostCSS and writes the per-widget CSS snapshot shown under the comparison panes.

## License

MIT
