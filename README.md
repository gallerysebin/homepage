# 갤러리 세빈 — 첫 GitHub Pages 실험

조동범 사진전 《일상이라는 슬픔과 불가능한 너머》 안내 페이지입니다.
기존 artsebin.com과 별개로 운영합니다.

## 직접 수정하기

1. GitHub에서 `index.html`을 엽니다.
2. 연필 버튼으로 편집 화면을 엽니다.
3. 바꿀 문장을 찾아 수정합니다. 처음에는 짧은 소개 문장 한 줄로 연습하세요.
4. `Commit changes`로 저장합니다. 공개 설정 후에는 잠시 뒤 사이트에도 반영됩니다.

`index.html`은 글과 구성, `style.css`는 색과 배치, `assets/`는 사진입니다.
기본 공개 주소: https://gallerysebin.github.io/homepage/

## 문의 기록 기능 설정 (Supabase)

문의 폼은 Supabase에 저장되며, 작성자가 공개에 동의한 문의만 페이지 하단의 ‘공개 문의 기록’에 표시됩니다. 연락처는 어떤 경우에도 페이지에 표시되지 않습니다.

1. [Supabase](https://supabase.com/)에서 새 프로젝트를 만듭니다.
2. 프로젝트의 **SQL Editor**에서 `supabase-schema.sql` 전체를 실행합니다.
3. **Project Settings → API**에서 Project URL과 `anon` public key를 복사합니다.
4. `supabase-config.js`의 두 placeholder를 해당 값으로 바꿉니다. `service_role` 키는 절대 입력하거나 GitHub에 올리지 마세요.
5. 세 파일을 GitHub에 커밋하면 GitHub Pages에 반영됩니다.

Supabase의 테이블 편집기에서 `inquiries`를 열면 모든 문의와 연락처를 관리할 수 있습니다. 공개 문의를 숨기려면 해당 행의 `public_display`를 끄면 됩니다.

## 자료 기준

- 제공된 전시 초대장: 전시 기간, 관람 시간, 휴관일, 주소
- 제공된 HWPX: 작가 소개와 작가 노트
- 제공된 PNG: 작가 사진과 작품 목록 (작품 개별 원본은 아님)

전시 기간은 2026년 10월 17일–11월 1일이며 화·수·목 휴관입니다.
