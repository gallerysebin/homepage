create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  contact text check (contact is null or char_length(contact) <= 120),
  message text not null check (char_length(message) between 1 and 1000),
  public_display boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;
grant insert (name, contact, message, public_display) on public.inquiries to anon;
grant select (name, message, created_at, public_display) on public.inquiries to anon;
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert to anon
  with check (char_length(trim(name)) between 1 and 40 and char_length(trim(message)) between 1 and 1000);
create policy "Anyone can read public inquiries"
  on public.inquiries for select to anon using (public_display = true);
