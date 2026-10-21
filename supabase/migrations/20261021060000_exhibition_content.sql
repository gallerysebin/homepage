create table public.exhibitions (
  id text primary key,
  artist text not null,
  title_lines text[] not null,
  date_label text not null,
  visit_period text not null,
  hours text not null,
  closed_days text not null,
  location text not null,
  address text not null,
  subway text not null,
  summary text not null,
  published boolean not null default false
);

create table public.programs (
  id text primary key,
  exhibition_id text not null references public.exhibitions(id),
  position integer not null,
  kind text not null check (kind in ('scheduled', 'extra')),
  event_date date,
  date_label text,
  title text not null,
  details text[] not null,
  badge text,
  published boolean not null default false
);

alter table public.exhibitions enable row level security;
alter table public.programs enable row level security;
revoke all on public.exhibitions, public.programs from anon, authenticated;
grant select on public.exhibitions, public.programs to anon, authenticated;
create policy "Read published exhibitions" on public.exhibitions
  for select to anon, authenticated using (published);
create policy "Read published programs" on public.programs
  for select to anon, authenticated using (
    published and exists (select 1 from public.exhibitions e where e.id = exhibition_id and e.published)
  );

insert into public.exhibitions values (
  'dongbeom-cho-2026', '조동범 사진전',
  array['일상이라는', '슬픔과 불가능한', '너머'],
  '2026. 10. 17 — 11. 01', '2026년 10월 17일(토)–11월 1일(일)',
  '12:00–18:00', '매주 화·수·목 휴관', '갤러리 세빈',
  '서울 용산구 회나무로13가길 20', '녹사평역 2번 출구',
  '조동범은 일상의 비루함과 참혹함을 생각하며, 익숙한 삶의 경계 너머를 사진으로 바라봅니다. 반복되는 일상 안에서 쉽게 지나쳤던 장면과 감각을 마주하는 전시입니다.', true
);

insert into public.programs values
('opening', 'dongbeom-cho-2026', 1, 'scheduled', '2026-10-17', '10.17 토', '오프닝 리셉션', array['15:00 · 40명 내외', '핑거푸드 및 와인 준비 예정'], null, true),
('itaewon-walk', 'dongbeom-cho-2026', 2, 'scheduled', '2026-10-23', '10.23 금', '이태원 답사', array['11:00–13:00 · 20명', '안양작가회의·일반인 참여', '13:00 답사팀과 함께 갤러리 도착'], null, true),
('photo-poetry', 'dongbeom-cho-2026', 3, 'scheduled', '2026-10-24', '10.24 토', '미학 강의 — 사진과 시', array['11:00–13:00 · 20명'], null, true),
('haebangchon-walk', 'dongbeom-cho-2026', 4, 'scheduled', '2026-10-30', '10.30 금', '명동부터 해방촌까지 답사', array['11:00–13:00 · 20명', '문화지평', '13:00 답사팀과 함께 갤러리 도착'], null, true),
('modernity-art', 'dongbeom-cho-2026', 5, 'scheduled', '2026-10-31', '10.31 토', '미학 강의 — 현대성과 일상 그리고 예술', array['11:00–13:00 · 20명'], null, true),
('artist-sundays', 'dongbeom-cho-2026', 6, 'extra', null, null, '일요일 작가 상주', array['10월 18일 · 10월 25일 · 11월 1일', '상주 시간은 별도 안내 예정입니다.'], null, true),
('poetry-class', 'dongbeom-cho-2026', 7, 'extra', null, null, '소규모 시창작 강의', array['10월 19일(월) 또는 10월 26일(월) 중 하루', '14:00–16:00 · 4명'], '일정 미정', true);
