-- FlipForward-administratie (/admin): klanten, projecten, offertes, betalingen, voortgang en werkuren.
-- Enkel voor projecten die echt lopen (vanaf "getekend"); leads en demo's blijven in Notion.
-- Uitvoeren in de SQL-editor van het Supabase-project (regio Frankfurt).

create extension if not exists pgcrypto;

-- Enige gebruiker die iets mag zien. Daarnaast in Supabase: Authentication → Sign In / Providers → "Allow new users to sign up" UIT.
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'finn@flipforward.be'
$$;

create table public.klanten (
  id uuid primary key default gen_random_uuid(),
  bedrijf text not null,
  ondernemingsnummer text,
  adres text,
  -- [{ "naam": "...", "rol": "...", "email": "...", "telefoon": "..." }]
  contacten jsonb not null default '[]'::jsonb,
  gmail_label text,
  notities text,
  created_at timestamptz not null default now()
);

create table public.projecten (
  id uuid primary key default gen_random_uuid(),
  klant_id uuid not null references public.klanten (id) on delete cascade,
  naam text not null,
  status text not null default 'getekend'
    check (status in ('getekend', 'in_opbouw', 'klaar_voor_livegang', 'live', 'gestopt')),
  pakket text,
  opstartprijs numeric(10, 2),
  maandbedrag numeric(10, 2),
  -- Aantal gefactureerde maandtermijnen in de eerste periode (bv. 12 maanden aan de prijs van 11 → 11)
  termijnen integer,
  looptijd_maanden integer,
  uren_per_maand numeric(4, 2),
  akkoord_op date,
  livegang_op date,
  start_onderhoud date,
  domein text,
  dns_status text,
  demo_url text,
  live_url text,
  repo_url text,
  vercel_project text,
  notities text,
  created_at timestamptz not null default now()
);

create table public.offertes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projecten (id) on delete cascade,
  nummer text not null unique,
  datum date,
  verstuurd_op date,
  getekend_op date,
  getekend_door text,
  opstart numeric(10, 2),
  maandbedrag numeric(10, 2),
  totaal_eerste_jaar numeric(10, 2),
  status text not null default 'opgesteld'
    check (status in ('opgesteld', 'verstuurd', 'getekend', 'afgewezen', 'verlopen')),
  -- Pad in de privé-bucket "offertes", of voorlopig de lokale map (verkoop/…)
  pdf_pad text,
  notities text,
  created_at timestamptz not null default now()
);

create table public.betalingen (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projecten (id) on delete cascade,
  soort text not null check (soort in ('opstart_1', 'opstart_2', 'termijn', 'extra')),
  omschrijving text not null,
  bedrag numeric(10, 2) not null,
  vervaldatum date,
  gefactureerd_op date,
  betaald_op date,
  created_at timestamptz not null default now()
);

create table public.taken (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projecten (id) on delete cascade,
  titel text not null,
  wie text not null default 'finn' check (wie in ('finn', 'klant')),
  klaar boolean not null default false,
  klaar_op date,
  volgorde integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.werkuren (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projecten (id) on delete cascade,
  datum date not null default current_date,
  minuten integer not null check (minuten > 0),
  omschrijving text,
  created_at timestamptz not null default now()
);

create index on public.projecten (klant_id);
create index on public.offertes (project_id);
create index on public.betalingen (project_id);
create index on public.taken (project_id);
create index on public.werkuren (project_id);

-- Row Level Security: zonder ingelogde admin geeft elke tabel niets terug (ook niet met de publieke anon-key).
do $$
declare t text;
begin
  foreach t in array array['klanten', 'projecten', 'offertes', 'betalingen', 'taken', 'werkuren'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy admin_alles on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    -- Expliciete rechten, ongeacht "Automatically expose new tables": anon krijgt niets, authenticated enkel via RLS.
    execute format('revoke all on public.%I from anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

-- Privé-bucket voor offerte-pdf's (getekend en origineel).
insert into storage.buckets (id, name, public) values ('offertes', 'offertes', false)
on conflict (id) do nothing;

create policy offertes_admin on storage.objects for all to authenticated
  using (bucket_id = 'offertes' and public.is_admin())
  with check (bucket_id = 'offertes' and public.is_admin());
