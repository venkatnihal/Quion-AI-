-- ============================================================================
-- QuionAi Super Admin CMS — database schema
-- Run this in Supabase → SQL Editor (once). Safe to re-run (idempotent).
--
-- Security model:
--   • Admin/CMS writes go through the server using the SERVICE ROLE key, which
--     bypasses RLS. So RLS here only governs the PUBLIC (anon) surface:
--     the website may READ published content and INSERT leads/bookings/events.
--   • Everything else is closed to anon by default.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────────
-- profiles — one row per auth user, carries the CMS role
-- ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  role       text not null default 'viewer'
             check (role in ('super_admin','editor','viewer')),
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- content — editable pages/sections/settings, keyed (e.g. 'home.hero',
-- 'settings.global', 'settings.theme', 'nav.primary'). data is JSONB.
-- ────────────────────────────────────────────────────────────────
create table if not exists public.content (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  status     text not null default 'published' check (status in ('draft','published')),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.content_versions (
  id         uuid primary key default gen_random_uuid(),
  key        text not null,
  data       jsonb not null,
  status     text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);
create index if not exists content_versions_key_idx on public.content_versions(key, created_at desc);

-- ────────────────────────────────────────────────────────────────
-- Collections (services / testimonials / faqs). Portfolio uses `projects`.
-- ────────────────────────────────────────────────────────────────
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique,
  title       text not null,
  description text,
  icon        text,
  features    jsonb default '[]'::jsonb,
  image       text,
  cta         text,
  seo         jsonb default '{}'::jsonb,
  sort_order  int default 0,
  status      text not null default 'published' check (status in ('draft','published')),
  created_at  timestamptz not null default now()
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique,
  title       text not null,
  description text,
  category    text,
  images      jsonb default '[]'::jsonb,
  tech        jsonb default '[]'::jsonb,
  results     jsonb default '[]'::jsonb,
  client      text,
  completed   text,
  url         text,
  featured    boolean default false,
  sort_order  int default 0,
  status      text not null default 'published' check (status in ('draft','published')),
  created_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  company     text,
  quote       text not null,
  avatar      text,
  logo        text,
  rating      int default 5,
  video       text,
  featured    boolean default false,
  sort_order  int default 0,
  status      text not null default 'published' check (status in ('draft','published')),
  created_at  timestamptz not null default now()
);

create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  category    text default 'General',
  sort_order  int default 0,
  status      text not null default 'published' check (status in ('draft','published')),
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- leads — website form submissions
-- ────────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  company    text,
  service    text,
  budget     text,
  message    text,
  list       text,
  subject    text,
  source     text default 'Website',
  status     text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  assigned_to uuid references auth.users(id) on delete set null,
  notes      text,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- bookings — strategy-call requests / Outlook sync
-- ────────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  email       text,
  phone       text,
  company     text,
  topic       text,
  starts_at   timestamptz,
  ends_at     timestamptz,
  status      text not null default 'pending' check (status in ('pending','approved','rejected','cancelled','completed')),
  outlook_event_id text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- media — Cloudinary asset library
-- ────────────────────────────────────────────────────────────────
create table if not exists public.media (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  public_id   text,
  type        text default 'image',
  format      text,
  folder      text default 'quionai',
  tags        jsonb default '[]'::jsonb,
  alt         text,
  caption     text,
  width       int,
  height      int,
  bytes       int,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- AI: knowledge base + prompts + chat history
-- ────────────────────────────────────────────────────────────────
create table if not exists public.ai_knowledge (
  id         uuid primary key default gen_random_uuid(),
  category   text not null default 'Company',
  title      text not null,
  body       text not null,
  status     text not null default 'published' check (status in ('draft','published')),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_prompts (
  key        text primary key,   -- system | sales | support | qualify | greeting | fallback
  content    text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_conversations (
  id         uuid primary key default gen_random_uuid(),
  visitor_id text,
  summary    text,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id             uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.chat_conversations(id) on delete cascade,
  role           text not null check (role in ('user','assistant','system')),
  content        text not null,
  created_at     timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────
-- analytics + audit
-- ────────────────────────────────────────────────────────────────
create table if not exists public.analytics_events (
  id         uuid primary key default gen_random_uuid(),
  type       text not null,       -- pageview | lead | booking | chat | cta
  path       text,
  referrer   text,
  country    text,
  device     text,
  meta       jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_created_idx on public.analytics_events(created_at desc);

create table if not exists public.audit_logs (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  user_email text,
  action     text not null,
  entity     text,
  meta       jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles          enable row level security;
alter table public.content           enable row level security;
alter table public.content_versions  enable row level security;
alter table public.services          enable row level security;
alter table public.projects          enable row level security;
alter table public.testimonials      enable row level security;
alter table public.faqs              enable row level security;
alter table public.leads             enable row level security;
alter table public.bookings          enable row level security;
alter table public.media             enable row level security;
alter table public.ai_knowledge      enable row level security;
alter table public.ai_prompts        enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages     enable row level security;
alter table public.analytics_events  enable row level security;
alter table public.audit_logs        enable row level security;

-- Helper: drop-then-create a policy (Postgres has no CREATE POLICY IF NOT EXISTS)
do $$
begin
  -- PUBLIC READ: published content + collections
  perform 1;
end $$;

-- Public can read published content
drop policy if exists content_public_read on public.content;
create policy content_public_read on public.content
  for select using (status = 'published');

drop policy if exists services_public_read on public.services;
create policy services_public_read on public.services
  for select using (status = 'published');

drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
  for select using (status = 'published');

drop policy if exists testimonials_public_read on public.testimonials;
create policy testimonials_public_read on public.testimonials
  for select using (status = 'published');

drop policy if exists faqs_public_read on public.faqs;
create policy faqs_public_read on public.faqs
  for select using (status = 'published');

drop policy if exists ai_knowledge_public_read on public.ai_knowledge;
create policy ai_knowledge_public_read on public.ai_knowledge
  for select using (status = 'published');

-- Public can INSERT leads / bookings / analytics / chat (capture only)
drop policy if exists leads_public_insert on public.leads;
create policy leads_public_insert on public.leads for insert with check (true);

drop policy if exists bookings_public_insert on public.bookings;
create policy bookings_public_insert on public.bookings for insert with check (true);

drop policy if exists analytics_public_insert on public.analytics_events;
create policy analytics_public_insert on public.analytics_events for insert with check (true);

drop policy if exists chat_conv_public_insert on public.chat_conversations;
create policy chat_conv_public_insert on public.chat_conversations for insert with check (true);

drop policy if exists chat_msg_public_insert on public.chat_messages;
create policy chat_msg_public_insert on public.chat_messages for insert with check (true);

-- Authenticated users may read their own profile
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = id);

-- Note: all privileged writes (content edits, CRUD, moderation, exports) are
-- performed server-side with the service-role key, which bypasses RLS. No
-- broad write policy is granted to anon/authenticated by design.

-- ============================================================================
-- Auto-provision a profile when a new auth user is created
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    case when lower(new.email) = lower(coalesce(current_setting('app.super_admin_email', true), ''))
         then 'super_admin' else 'viewer' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Seed default AI prompts (edit later in the CMS → AI Agent)
-- ============================================================================
insert into public.ai_prompts (key, content) values
  ('system',  'You are QuionAi''s AI assistant. QuionAi is an AI transformation company that helps businesses automate operations, generate leads, and scale with intelligent AI systems. Be concise, helpful, professional and focused on business value. Guide qualified visitors to book a strategy call.'),
  ('greeting','Hi! I''m the QuionAi assistant. How can I help you automate and scale your business today?'),
  ('sales',   'Focus on ROI, time savings, and revenue growth. Qualify the visitor (business, goal, budget, timeline) and invite them to book a free strategy call.'),
  ('support', 'Answer questions about QuionAi''s services, process, and pricing accurately using the knowledge base. If unsure, offer to connect them with the team.'),
  ('qualify', 'Politely gather: business name, industry, main challenge, monthly budget range, and timeline. Summarise as a qualified lead.'),
  ('fallback','I want to get this right — let me connect you with a QuionAi specialist. Could you share your email so the team can follow up?')
on conflict (key) do nothing;

-- Done.
