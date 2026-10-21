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

## 자료 기준

- 제공된 전시 초대장: 전시 기간, 관람 시간, 휴관일, 주소
- 제공된 HWPX: 작가 소개와 작가 노트
- 제공된 PNG: 작가 사진과 작품 목록 (작품 개별 원본은 아님)

전시 기간은 2026년 10월 17일–11월 1일이며 화·수·목 휴관입니다.

## 전시·프로그램 DB 관리

Supabase 프로젝트 `homepage` (`mvekzxjruttvpdcgqyuf`)를 사용합니다.
대시보드의 Table Editor에서 `exhibitions`(전시·방문 정보), `programs`(프로그램)를 수정하면
다음 페이지 방문부터 반영됩니다. `published = true`인 정보만 공개됩니다.
프로그램은 `position` 순서로 표시하며, `kind`는 일정 목록 `scheduled` 또는 추가 안내 `extra`입니다.
`details`는 줄별 설명 배열입니다. 브라우저는 공개 콘텐츠 읽기만 가능하고 쓰기는 차단됩니다.

`content.js`가 공개 키로 DB를 조회합니다. 연결 장애나 JavaScript 비활성화 시 기존 HTML 안내를 표시합니다.
서비스 비밀 키나 DB 비밀번호를 브라우저 코드에 넣지 않습니다.

## 전시 전용 주소

예정 주소는 `https://exhibition.artsebin.com`입니다.
DNS 관리에서 `exhibition` 이름의 CNAME을 `gallerysebin.github.io`로 연결한 후 GitHub Pages 사용자 도메인을 적용합니다.
도메인 전환 전까지 기존 GitHub Pages 주소를 사용합니다.
