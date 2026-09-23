# (주)인지아이앤에스 QMS 홈페이지

작업 폴더: `C:\homepage`

품질관리 기업을 대상으로 ISO 9001·IATF 16949 관련 업무를 지원하는 QMS 맞춤 개발·운영 서비스를 소개하는 홈페이지입니다.

## 진행 상태

Next.js 홈페이지의 서비스 소개 화면을 구현했습니다. 온라인 상담 접수 기능은 개인정보 운영 기준 확정 후 연결합니다.

- [1일차 — 요구사항](docs/day-01-requirements.md)
- [2일차 — 방문 흐름과 콘텐츠 기획](docs/day-02-customer-flow-and-content.md)
- [3일차 — PC·모바일 화면 설계](docs/day-03-screen-design.md)
- [4일차 — 홈페이지 콘텐츠 기준안](docs/day-04-content.md)
- [5일차 — 시각 디자인 기준안](docs/day-05-visual-design.md)
- [6일차 — 모바일·문의 상태 디자인](docs/day-06-mobile-refinement.md)
- [7일차 — 개발 환경과 연결 상태](docs/day-07-environment.md)
- [Supabase 데이터베이스 연결 안내](docs/database-setup.md)

문구는 4일차 기준안을, 배치·동작은 3일차 설계를 기준으로 진행합니다. 상단 회사명은 왼쪽에 배치합니다.

`docs/day-03-screen-mockup.fragment.html`은 대화에 표시한 화면 설계용 HTML 조각의 보관본입니다. 독립 실행용 홈페이지나 실제 QMS가 아닙니다.

## 개발 방향

Next.js · GitHub · Vercel · Supabase를 사용합니다. 홍보 홈페이지와 상담 접수를 먼저 개발하고 실제 QMS 관리 시스템은 후속 범위로 구분합니다.

## 작업 방식

로컬 개발 서버(`pnpm run dev`)는 실행하지 않습니다. 코드 변경은 `pnpm run build`로 확인하고, 화면과 사용자 흐름은 Vercel 프로젝트 연결 후 미리보기 배포에서 확인합니다.

## 다음 단계

현재 홈페이지는 서비스 소개와 전화 상담을 제공합니다. 온라인 상담 접수는 개인정보 운영 기준과 Supabase 저장 기능을 준비한 뒤 추가합니다.

로고·수행 사례는 제공 시 반영하며, 온라인 문의 접수 전 운영 이메일·접수 담당자·개인정보 운영 기준을 확정합니다.
