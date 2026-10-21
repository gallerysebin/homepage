-- Supabase Dashboard → SQL Editor에서 한 번 실행하세요.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  contact text check (contact is null or char_length(contact) <= 120),
  message text not null check (char_length(message) between 1 and 1000),
  public_display boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- 누구나 문의를 남길 수 있지만, 공개 동의한 문의만 읽을 수 있습니다.
create policy "Anyone can submit an inquiry"
on public.inquiries for insert to anon
with check (
  char_length(name) between 1 and 40
  and char_length(message) between 1 and 1000
);

create policy "Anyone can read public inquiries"
on public.inquiries for select to anon
using (public_display = true);
