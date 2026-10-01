create schema if not exists private;
revoke all on schema private from public;

create table public.member_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  full_name text not null default '',
  company_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint member_username_format check (username ~ '^[a-z][a-z0-9_]{3,23}$'),
  constraint member_full_name_length check (char_length(full_name) <= 80),
  constraint member_company_name_length check (char_length(company_name) <= 120)
);

alter table public.member_profiles enable row level security;
revoke all on public.member_profiles from anon, authenticated;
grant select on public.member_profiles to authenticated;
grant update (full_name, company_name, updated_at) on public.member_profiles to authenticated;

create policy "Members see own profile; admins see all"
  on public.member_profiles for select to authenticated
  using ((select auth.uid()) = id
    or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Members update own profile"
  on public.member_profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create function private.create_member_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  auth_email text := lower(coalesce(new.email, ''));
  login_name text;
begin
  if auth_email !~ '^[a-z][a-z0-9_]{3,23}@members\.homepage\.example\.com$' then
    raise exception 'Member signup requires a valid username identity';
  end if;
  login_name := split_part(auth_email, '@', 1);
  insert into public.member_profiles (id, username, created_at)
  values (new.id, login_name, coalesce(new.created_at, now()));
  return new;
end;
$$;

revoke all on function private.create_member_profile() from public, anon, authenticated;

create trigger on_auth_user_created_member_profile
  after insert on auth.users
  for each row execute function private.create_member_profile();
