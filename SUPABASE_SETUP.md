# QuionAi — Supabase Setup (portfolio + leads)

One-time setup. You'll paste one SQL block, then send me your Project URL.

## Step 1 — Create the tables (30 seconds)
In Supabase → **SQL Editor** → **New query** → paste all of this → **Run**:

```sql
-- ── Portfolio projects ──
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  industry text,
  services text[] default '{}',
  description text,
  technologies text[] default '{}',
  result text,
  live_url text,
  image text,
  year text,
  featured boolean default false,
  order_rank int,
  testimonial jsonb,
  created_at timestamptz default now()
);

-- ── Leads (contact / quote / newsletter) ──
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  company text,
  service text,
  budget text,
  message text,
  list text,
  subject text,
  source text,
  created_at timestamptz default now()
);

-- ── Row-Level Security: public can READ projects and INSERT leads only ──
alter table public.projects enable row level security;
alter table public.leads enable row level security;

drop policy if exists "read projects" on public.projects;
create policy "read projects" on public.projects for select using (true);

drop policy if exists "insert leads" on public.leads;
create policy "insert leads" on public.leads for insert with check (true);

-- Grants for the public (anon) key
grant usage on schema public to anon;
grant select on public.projects to anon;
grant insert on public.leads to anon;

-- ── Seed your first project (migrated from Sanity) ──
insert into public.projects
  (slug, title, client, industry, services, description, technologies, result, live_url, featured)
values
  ('paaniclothing', 'Paaniclothing', 'Paani''s clothing', 'clothing',
   array['Website Development','AI Chatbots'],
   'A fast, conversion-focused online store for the Paani''s clothing brand.',
   array['Next.js','Netlify'],
   'Launched a modern, mobile-first storefront.',
   'https://demopaanis.netlify.app/', true)
on conflict (slug) do nothing;
```

## Step 2 — Send me your Project URL
Supabase → **Settings → API → Project URL** (looks like `https://abcdxyz.supabase.co`). Paste it to me and I'll connect + rebuild.

## Adding portfolio projects (day-to-day, no code)
Supabase → **Table Editor → projects → Insert row**. Fields:
- **slug** – short id, e.g. `acme-store` (lowercase, no spaces)
- **title, client, industry, description, result, year**
- **services / technologies** – arrays: click the field and add items
- **live_url** – the live website link
- **image** – a public image URL (upload to Supabase → **Storage** → create a public bucket → copy the file's public URL)
- **featured** – true to pin it first
- **testimonial** – JSON: `{"quote":"...","author":"Jane","role":"CEO, Acme"}`

Then tell me **"rebuild"** and I'll produce a fresh site zip for Hostinger.

## Viewing leads
Supabase → **Table Editor → leads** — every contact/quote/newsletter submission lands here, newest first.
