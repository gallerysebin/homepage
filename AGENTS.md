# Supabase 운영 안내

이 PC에서는 API 통신을 검증한 CLI 2.75.0을 `%LOCALAPPDATA%/Codex/Tools/supabase/2.75.0/supabase.exe`에서 우선 사용합니다.
`scripts/supabase.cjs`가 이를 선택하며, 다른 PC에서는 npm 로컬 의존성으로 대체합니다. 전역 설치에 의존하지 말고
`npm run supabase -- <명령>` 또는 아래의 npm 스크립트를 사용합니다.

## Codex용 명령

- `npm run supabase:version`: CLI 버전 확인
- `npm run supabase:status`: 로컬 Supabase 서비스 상태 확인
- `npm run supabase:start` / `npm run supabase:stop`: 로컬 서비스 시작 또는 중지 (Docker Desktop 또는 Podman 필요)
- `npm run supabase:login`: Supabase CLI 인증 (사용자가 토큰을 직접 입력)
- `npm run supabase:link -- --project-ref <project-ref>`: 원격 프로젝트 연결 (인증 및 프로젝트 ID 필요)
- `npm run supabase:db:diff -- --file <migration-name>`: 로컬 DB 변경 사항에서 마이그레이션 생성

## 안전 규칙

- `.env*` 파일과 비밀 API 키(service_role/secret/PAT)를 출력하거나 커밋하지 않는다. 브라우저 연결용 publishable/anon 공개 키는 RLS 읽기 정책과 함께 코드에 사용할 수 있다.
- `supabase db push`, `supabase db reset`, 원격 마이그레이션 적용, 시크릿 변경은 데이터 또는 운영 환경에 영향을 줄 수 있으므로 사용자의 명시적인 승인 후에만 실행한다.
- 원격 프로젝트: `homepage`, ref `mvekzxjruttvpdcgqyuf`, 조직 `gallerysebin's Org`, 서울 리전 `ap-northeast-2`.
- 이 PC의 로컬 CLI 연결은 완료됐다. 다른 PC에서는 동일 ref로 연결한다. GitHub Pages의 브라우저 코드에는 아직 Supabase 기능이 없다.
- DB 비밀번호는 `%LOCALAPPDATA%/Codex/SupabaseCredentials/homepage.xml`에 Windows 사용자 암호화(DPAPI)로 저장했다. 값을 출력하거나 저장소에 복사하지 않는다.
