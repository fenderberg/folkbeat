-- FolkBeat centrale openbare bibliotheek
-- Uitvoeren in Supabase Dashboard > SQL Editor.

create table if not exists public.grooves (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songs (
  id text primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.grooves enable row level security;
alter table public.songs enable row level security;

grant select on public.grooves, public.songs to anon, authenticated;
grant insert, update, delete on public.grooves, public.songs to authenticated;

drop policy if exists "Grooves are publicly readable" on public.grooves;
create policy "Grooves are publicly readable"
on public.grooves for select
to anon, authenticated
using (true);

drop policy if exists "Anonymous users can create grooves" on public.grooves;
create policy "Anonymous users can create grooves"
on public.grooves for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "Owners can update grooves" on public.grooves;
create policy "Owners can update grooves"
on public.grooves for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "Owners can delete grooves" on public.grooves;
create policy "Owners can delete grooves"
on public.grooves for delete
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "Songs are publicly readable" on public.songs;
create policy "Songs are publicly readable"
on public.songs for select
to anon, authenticated
using (true);

drop policy if exists "Anonymous users can create songs" on public.songs;
create policy "Anonymous users can create songs"
on public.songs for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "Owners can update songs" on public.songs;
create policy "Owners can update songs"
on public.songs for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "Owners can delete songs" on public.songs;
create policy "Owners can delete songs"
on public.songs for delete
to authenticated
using ((select auth.uid()) = owner_id);
