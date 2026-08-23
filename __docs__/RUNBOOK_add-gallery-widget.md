# Runbook: add another RuleCMS widget to this gallery

Agent-facing. Follow this when the user says something like:

- “Add support for one more RuleCMS widget with this widget ID”
- “Add widget 2 with published key …”
- “Embed another RuleCMS widget and give it a page”

They may say **widget ID**. In this codebase the embed identifier is the **published key** (`{environmentId}---widget-…`). If they only send an internal UUID, ask for the published key.

Also ask for (or create) the **left-pane source JSX** that Tailwind should scan. Without those class names in host source, the right-pane widget will not have matching utilities.

## What “done” means

1. The left sidebar lists the new widget (same label pattern as `use_rulecms_nextjs_no_tailwind`).
2. `/widgets/<slug>` is a left/right comparison: host source vs client-side `RuleCMSWidget`.
3. `/widgets/<slug>/ssr` is the same split with `fetchRuleCMSWidget` + `mode="pre-fetched"` on the right.
4. Host JSX for that slug lives under `src/components/source/` and is registered in `src/lib/source-by-slug.ts`.
5. `.env.example` and `VERCEL.md` list the new env var (blank values — never commit tokens).
6. The host still **has Tailwind**. Do not remove it.

Do not create a new Next.js app. This repo is the gallery.

## Non-negotiables

- Tokens stay in environment variables. Never put real tokens or published keys in git.
- There is **one** app token: `RULECMS_TOKEN`. Do not add `NEXT_PUBLIC_RULECMS_TOKEN`.
- Widget CSS for this gallery comes from **this host**. The RuleCMS widget should be DOM + class names only.
- Routes are generated from `src/lib/gallery-widgets.ts`. You should not need a new `page.tsx` per widget.

## Steps

### 1. Confirm the published key, label, and source JSX

Ask if missing:

- Published key
- Sidebar label (default `Widget N`)
- Left-pane JSX / Tailwind classes (or a description to implement)

### 2. Append the registry

`src/lib/gallery-widgets.ts`:

```ts
{
  slug: 'widget-2',
  label: 'Widget 2',
  description: 'Compare host JSX (left) with the RuleCMS widget (right).',
  publishedKeyEnv: 'RULECMS_WIDGET_2_PUBLISHED_KEY',
},
```

### 3. Add host source JSX

Create `src/components/source/widget-2-source.tsx` and register it in `src/lib/source-by-slug.ts`:

```ts
'widget-2': Widget2Source,
```

Put every class the RuleCMS widget will use in this file (or elsewhere in host source) so Tailwind emits the CSS.

### 4. Add env placeholders (blank)

`.env.example`:

```
RULECMS_WIDGET_2_PUBLISHED_KEY=
```

`VERCEL.md`: add that name. Tell the user to set it locally and on Vercel, then redeploy.

### 5. Do not write the published key into source

Put keys only in `.env.local` (gitignored) or tell the user to paste them into Vercel. Never commit `.env.local`.

### 6. Verify

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` must run **outside** the agent sandbox (`required_permissions: ["all"]`). See `.cursor/rules/never-build-in-sandbox.mdc`.

## What you should not do

- Do not remove Tailwind or `@tailwindcss/postcss`.
- Do not add demo tokens as source fallbacks.
- Do not introduce `NEXT_PUBLIC_RULECMS_TOKEN`.
- Do not mention a specific Vercel team in user-facing docs.

## Files you will usually touch

| File | Change |
| --- | --- |
| `src/lib/gallery-widgets.ts` | New registry entry |
| `src/components/source/widget-N-source.tsx` | Host JSX |
| `src/lib/source-by-slug.ts` | Register the source component |
| `.env.example` | Blank published-key var |
| `VERCEL.md` | Document that var |
