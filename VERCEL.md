# Deploy this example on Vercel

This is a Next.js app. Any Vercel account that can import a GitHub repository can host it. The steps below are the same for a personal account or a team.

## 1. Put the code on GitHub

This repository should be **public** (or private, if your Vercel plan allows private Git repos). Push `main`.

## 2. Import the project in Vercel

1. Open the [Vercel dashboard](https://vercel.com/dashboard) and sign in.
2. Click **Add New… → Project**.
3. Import this GitHub repository. If it does not appear, grant the Vercel GitHub app access to the repository (or the organization that owns it) under GitHub **Settings → Applications → Vercel**.
4. Confirm the framework preset is **Next.js**. Leave the build command and output directory at the Next.js defaults (`next build`, `.next`).

## 3. Set environment variables

Before the first production deploy, add the variables from `.env.example`. In the Vercel project: **Settings → Environment Variables**. Apply them to Production, Preview, and Development unless you intentionally split them.

| Name | Required for | Notes |
| --- | --- | --- |
| `RULECMS_TOKEN` | All widget pages | The RuleCMS app token. One variable; used for client-side and server pre-fetched fetches. |
| `RULECMS_ENDPOINT` | Optional | Defaults to `https://rulecms.com`. |
| `RULECMS_WIDGET_1_PUBLISHED_KEY` | Widget 1 | Published key from RuleCMS (`{environmentId}---widget-…`). |

When you add another gallery widget, add `RULECMS_WIDGET_<N>_PUBLISHED_KEY` (see `__docs__/RUNBOOK_add-gallery-widget.md`).

After you change env vars, trigger a new deployment.

## 4. Deploy

Click **Deploy**. The production URL is shown when the build finishes. Later pushes to the connected Git branch deploy automatically.

### What you should see

- `/` — gallery homepage and left sidebar.
- `/widgets/widget-1` — source JSX on the left, client-side RuleCMS widget on the right.
- `/widgets/widget-1/ssr` — same split; the right pane is server pre-fetched.

If credentials are missing, the right pane shows a configuration message instead of failing the build.

## 5. Local check (optional)

```bash
cp .env.example .env.local
# fill in RULECMS_TOKEN and published keys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Troubleshooting

- **Right pane says credentials are not configured** — `RULECMS_TOKEN` or the widget published-key var is missing. Redeploy after changing them on the host.
- **SSR page shows a fetch error** — the published key, `RULECMS_TOKEN`, or endpoint is wrong, or the widget is unpublished.
- **Right pane has no styles** — this host compiles Tailwind from the **left** pane’s class names. The RuleCMS widget must use those same classes; it does not bring its own CSS.
- **GitHub repo does not appear in Vercel** — the Vercel GitHub app is not installed on that account or organization, or it is not granted access to this repository.
