-- Facturatieplanning: maandelijks of jaarlijks onderhoud, en per termijn de periode die de factuur dekt.
-- De onderhoudsfacturen worden in de app berekend (src/admin/facturen.ts); een rij ontstaat pas bij "factuur verstuurd".

alter table public.projecten
  add column facturatie text not null default 'maandelijks'
    check (facturatie in ('maandelijks', 'jaarlijks'));

alter table public.betalingen add column periode date;

-- Eén termijn per periode per project.
create unique index betalingen_termijn_periode on public.betalingen (project_id, periode) where soort = 'termijn';
