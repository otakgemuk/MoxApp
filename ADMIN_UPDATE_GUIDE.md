# Admin Data Update Guide

## The one rule

**`data/plans.json` is the only data file that matters.**

`vite.config.ts` sets `publicDir: ../data`, so Vite serves `data/plans.json` at
`/plans.json`. Every part of the app — `usePlans.ts`, `App.tsx`, `Admin.tsx` —
fetches `./plans.json` at runtime. There is no other source.

Edit that one file, push to `main`, Vercel rebuilds in ~1–2 minutes. Done.

> **Do NOT copy the file anywhere.** Older versions of this guide told you to
> `cp` into `frontend/data.json`, `frontend/public/plans.json`, and
> `frontend/dist/plans.json`. Those paths are **not served** and have been
> removed. Keeping copies in sync was the only thing that ever caused "drift."
> `frontend/dist/` and `frontend/src/lib/staticData.ts` are build output —
> gitignored, regenerated, never edited by hand.

---

## Method 1: In-app Admin page (recommended)

**Best for:** quick pricing edits, one or a few plans.

1. Open `https://mox-app.vercel.app/admin.html`.
2. Edit fields inline (`eval_fee`, `activation_fee`, `active_discount_pct`, etc.).
3. The page commits the updated array straight to `data/plans.json` via the
   GitHub API (GET sha → PUT), then Vercel redeploys automatically.

> **Security note (Phase 2 TODO):** the page is gated by a client-side password,
> which is not real protection, and it needs a GitHub token to write. The planned
> fix is to move the write behind a Vercel serverless function that holds the
> token as a server env var, so no secret ships to the browser. Until then, never
> paste a long-lived PAT into the page on a shared machine.

---

## Method 2: Edit `data/plans.json` directly (bulk changes)

**Best for:** many plans, new firms, audits.

1. Open `data/plans.json` on GitHub (or via MCP) and edit the values.
2. Commit to `main`. That's the whole step — no copying, no script.
3. Wait ~1–2 minutes, then hard-refresh (`Ctrl/Cmd+Shift+R`).

---

## Total-cost formula (validate before every push)

`total_cost_to_funded` must always match one of these three branches:

1. **Standard:** `total = (eval_fee + activation_fee) × (1 − discount/100)`
2. **NexGen Evaluation exception:** discount applies to `eval_fee` only;
   activation paid separately at full price —
   `total = (eval_fee × (1 − discount/100)) + activation_fee`
3. **Instant / one-time:** `total = eval_fee` (no activation fee)

Update `active_discount_pct`, `has_discount`, `base_cost_to_funded`, and
`total_cost_to_funded` together. Plan count in = plan count out.

---

## Data schema (per object in `data/plans.json`)

```json
{
  "firm_id": "funded_futures_n",
  "firm_name": "Funded Futures Network",
  "plan_label": "Standard MAX 50K",
  "account_size": 50000,
  "account_type": "Standard MAX",
  "eval_fee": 160.0,
  "activation_fee": 0.0,
  "monthly_fee": 0.0,
  "active_discount_pct": 50,
  "total_cost_to_funded": 80.0
}
```

Key fields: `eval_fee` (cost to start eval), `activation_fee` (one-time),
`active_discount_pct` (0–100), `total_cost_to_funded` (computed per the formula
above). Full field list lives in the `PlanRow` interface in
`frontend/src/hooks/usePlans.ts`.

---

## Deployment

Hosting is **Vercel only** (`vercel.json`). Render and GitHub Pages configs have
been removed. Build: `cd frontend && npm install && npm run build`, output
`frontend/dist`. `data/plans.json` is served at the site root as `/plans.json`.

---

## Troubleshooting

**Changes not showing:** confirm the commit landed on `main`, check the Vercel
deployment reached READY on that SHA, then hard-refresh.

**Revert:** use GitHub's commit history → "Revert" on the bad commit, or restore
the previous `data/plans.json` from history.

---

Single file. Single push. No drift.
