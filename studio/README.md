# QuionAi Content Studio

This is your **admin panel** for editing Blog posts and Portfolio projects — no code required.

## First-time setup (once)

```bash
cd studio
npm install
npx sanity login          # sign in with Google/GitHub/email
npx sanity init           # create the "QuionAi" project → choose "production" dataset
npx sanity deploy         # publish the studio → gives you a https://<name>.sanity.studio URL
```

`sanity init` prints a **Project ID**. Copy it — you'll paste it into the website's
`.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID` (and into your Hostinger environment).

## Editing content day-to-day

Go to your `https://<name>.sanity.studio` URL, sign in, and add/edit:

- **Blog Post** — title, cover image, body (rich text), category, read time, date.
- **Portfolio Project** — client, industry, services, tech, result, live URL, testimonial, image.

Click **Publish**. The website updates on its next rebuild (see the deploy hook in the
project root: `.github/workflows/deploy.yml` and `SANITY_SETUP.md`).

## Local preview of the studio

```bash
npm run dev     # opens http://localhost:3333
```
