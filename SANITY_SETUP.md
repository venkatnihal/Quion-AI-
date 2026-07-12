# QuionAi — CMS & Auto-Deploy Setup (non-technical guide)

Your Blog and Portfolio can now be edited from a friendly admin panel (Sanity)
with **no coding**. This guide gets it live. You only do this **once**.

> **Good to know:** until you finish Step 1, the website keeps working exactly as
> it does now, using the built-in starter content. Nothing breaks while you set up.

---

## Step 1 — Create your admin panel (Sanity Studio)

```bash
cd studio
npm install
npx sanity login      # sign in (Google / GitHub / email)
npx sanity init       # creates the "QuionAi" project, dataset: production
npx sanity deploy     # publishes your admin panel
```

- `sanity init` shows a **Project ID** (looks like `a1b2c3d4`). **Copy it.**
- `sanity deploy` gives you your admin URL, e.g. `https://quionai.sanity.studio`.
  Bookmark it — this is where you'll add blog posts and projects.

## Step 2 — Connect the website to Sanity

Open `.env.local` (and add the same values in Hostinger + GitHub, see Step 4) and set:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_from_step_1
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 3 — Allow the website to read your content (CORS)

In your Sanity project dashboard (sanity.io/manage) → **API → CORS origins**, add:
- `https://quionai.com` (your live site)
- `http://localhost:3002` (local preview)

Leave "Allow credentials" unchecked. Your content is public/read-only for the site.

## Step 4 — Turn on auto-deploy to Hostinger (optional but recommended)

This makes your site rebuild and redeploy automatically whenever you publish in Sanity.

1. Put this project on **GitHub** (private repo is fine).
2. In GitHub → **Settings → Secrets and variables → Actions**, add:
   - `FTP_SERVER` – your Hostinger FTP host (from hPanel → Files → FTP Accounts)
   - `FTP_USERNAME`, `FTP_PASSWORD` – your FTP login
   - `FTP_SERVER_DIR` – usually `public_html/` (or a subfolder)
   - `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
3. In Sanity (sanity.io/manage) → **API → Webhooks → Create webhook**:
   - URL: `https://api.github.com/repos/<you>/<repo>/dispatches`
   - Trigger: on Create / Update / Delete
   - HTTP method: `POST`
   - Headers: `Authorization: Bearer <a GitHub token with "repo" scope>`,
     `Accept: application/vnd.github+json`
   - Body (Projection): `{ "event_type": "sanity-publish" }`

Now: **publish in Sanity → GitHub builds the site → uploads to Hostinger.** Done.

> **No auto-deploy yet?** You can also just run `npm run build` locally and upload
> the `out/` folder to Hostinger's `public_html` via File Manager or FTP.

---

## What lives where

| Thing | Where you edit it |
|---|---|
| Blog posts, Portfolio projects | Sanity Studio (your admin URL) |
| Services, pricing, FAQ, testimonials | Code files in `src/data/*` (still easy to change) |
| Booking link, form email, domain | `.env.local` / Hostinger + GitHub secrets |

You can expand the CMS to cover more later — the code is structured for it.
