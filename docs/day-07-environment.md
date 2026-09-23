# 7일차 — 개발 환경 구성·연결 상태

회사: (주)인지아이앤에스  
작업 폴더: C:\homepage  
작성일: 2026-09-23

## 완료한 작업

| 항목 | 상태 | 내용 |
| --- | --- | --- |
| Next.js | 완료 | App Router·TypeScript 기반 기본 프로젝트 생성. Next.js 16.3.6, React 19.3.0으로 버전 고정하고 pnpm 잠금 파일 생성 |
| 기존 기획 문서 | 보존 | docs 폴더에 1~6일차 문서와 시안 유지 |
| Git | 로컬 설정 완료 | main 브랜치의 로컬 저장소를 만들고 origin을 https://github.com/parktaeyok/homepage.git 으로 설정 |
| Supabase | 기존 프로젝트 선택·로컬 설정 완료 | 사용자가 기존 `taeyok65-Project` 사용을 선택. 프로젝트 URL과 공개용 publishable key를 `.env.local`에 설정 |
| Supabase 설정 예시 | 완료 | `.env.example`에 필요한 환경 변수 이름 기록. `.env.local`은 Git 추적 제외 |
| Vercel | 연결 대기 | 팀 `taeyok-team`은 확인됐지만 이 홈페이지용 Vercel 프로젝트는 없음. 브라우저에서는 Vercel 로그인 화면이 열림 |
| 빌드 | 통과 | 기본 Next.js 프로젝트의 `pnpm run build` 통과, `/` 정적 페이지 생성 |

## 현재 구현 범위

이번 단계는 개발 환경 구성이다. Next.js 화면에는 아직 공식 생성기의 기본 페이지가 있고, 1~6일차 QMS 홈페이지 디자인과 문구는 반영하지 않았다. 상담 양식의 Supabase 저장 기능도 아직 없다. 향후 홈페이지 소스에 사용될 Supabase 접속 정보만 준비했다.

## 남은 연결 작업

1. GitHub: 사용자가 요청한 `# homepage` README 첫 커밋만 공개 저장소 `main`에 생성했다. 로컬 프로젝트 전체 소스와 기획 문서는 원격에 올리지 않았다. 로컬 `main`과 원격 `main`은 서로 다른 첫 커밋이므로 향후 전체 소스 업로드 전 이력을 정리해야 한다. GitHub CLI 인증은 없다.
2. Vercel: `taeyok-team`에서 홈페이지 프로젝트를 생성하고 GitHub 저장소와 연결해야 한다. 현재 Vercel 프로젝트와 `.vercel/project.json`이 없다. 이 계정의 브라우저 세션은 로그인이 필요하다.
3. Supabase: 프로젝트 URL과 공개키는 준비됐다. 상담 문의 저장 테이블·접근 정책과 실제 기능은 문의 기능 개발 단계에서 설계한다. 기존 프로젝트의 다른 데이터는 변경하지 않았다.
4. 배포 전: 회사의 개인정보 운영 정보, 상담 접수 담당자와 운영 이메일을 확정한다.

Vercel 연결과 환경 확인이 끝나기 전에는 개발 서버나 데이터베이스 변경 명령을 실행하지 않는다. 빌드는 통과했지만 배포·상담 접수 검증을 의미하지 않는다.

## 프로젝트 위치와 파일

- `src/app`: Next.js 기본 페이지·레이아웃. 홈페이지 구현 시 수정.
- `package.json`, `pnpm-lock.yaml`: 의존성·명령과 버전 고정.
- `.env.example`: 설정 항목 이름을 보여주는 공개 예시.
- `.env.local`: 선택한 Supabase 프로젝트의 로컬 공개 연결 정보. Git 추적 제외.
- `docs/`: 1~7일차 기획·설계·설정 기록.

## 다음 단계

8~10일차에 4일차 문구와 5~6일차 시안을 실제 Next.js 홈페이지에 구현한다. GitHub·Vercel 연결이 완료되면 개발 서버와 배포 흐름을 확인한다.


## 후속 동기화 기록

사용자 요청에 따라 공개 GitHub 저장소 main 브랜치에 전체 프로젝트를 동기화했다. 원격 README 첫 커밋과 로컬 이력을 병합했으며, .env.local은 Git에서 계속 제외한다. Vercel 프로젝트 연결은 여전히 대기 중이다.

