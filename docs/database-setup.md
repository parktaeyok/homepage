# Supabase 데이터베이스 연결 안내

이 홈페이지는 기존 Supabase 프로젝트 **taeyok65-Project**(프로젝트 참조 twvzhdprkgbdbzrjszrm)를 사용합니다. 현재 공개된 홈페이지는 서비스 소개와 전화 상담만 제공하며 데이터베이스에 접근하거나 온라인 문의를 저장하지 않습니다. 따라서 데이터베이스 설정이 빠져서 첫 화면에 Next.js 시작 페이지가 나타난 것은 아닙니다.

## 1. 프로젝트와 연결 정보 확인

1. [Supabase 대시보드](https://supabase.com/dashboard/project/twvzhdprkgbdbzrjszrm)에서 taeyok65-Project를 엽니다.
2. **Connect** 또는 **Settings → API Keys**에서 Project URL과 **publishable key**를 확인합니다.
3. [Vercel 프로젝트 설정](https://vercel.com/docs/environment-variables)의 **Settings → Environment Variables**에 다음 변수를 추가합니다. 실제 값은 대시보드에서 복사하고 GitHub에 올리지 않습니다.

| 변수 | 값 | 적용 환경 |
| --- | --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Supabase Project URL | Production, Preview |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | sb_publishable_... 형식의 공개 키 | Production, Preview |

환경 변수를 추가하거나 변경한 후에는 **Deployments → 최신 배포 → Redeploy**로 새 배포를 만듭니다. C:\homepage\.env.local은 로컬 빌드용이며 Vercel로 자동 전송되지 않습니다. 현재 홈페이지 코드는 Supabase 호출을 하지 않으므로 위 변수 설정 전에도 첫 화면은 표시됩니다.

**secret key**와 과거의 **service_role key**는 NEXT_PUBLIC_ 변수, 브라우저 코드, GitHub 저장소에 넣지 않습니다. 온라인 문의를 서버에서 구현할 때만 Vercel 서버 전용 환경 변수로 별도 보관합니다.

## 2. 문의 테이블은 접수 운영 정보 확정 후 생성

현재 프로젝트의 public 스키마에는 테이블이 없습니다. 아래 SQL은 온라인 문의 기능을 구현할 때 사용할 **준비 예시**이며, 지금 홈페이지가 표시되기 위해 실행할 필요는 없습니다. 개인정보 처리방침, 보관 기간, 접수 담당자·운영 이메일을 확정한 후 [Supabase SQL Editor](https://supabase.com/dashboard/project/twvzhdprkgbdbzrjszrm/sql/new)에서 검토해 실행합니다.

~~~sql
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  interested_features text[] not null default '{}',
  desired_timing text,
  message text not null,
  created_at timestamptz not null default now(),
  constraint company_name_not_blank check (length(trim(company_name)) > 0),
  constraint contact_name_not_blank check (length(trim(contact_name)) > 0),
  constraint message_not_blank check (length(trim(message)) > 0)
);

alter table public.consultation_requests enable row level security;
revoke all on public.consultation_requests from anon, authenticated;
grant select, insert on public.consultation_requests to service_role;
~~~

이 예시는 공개 사용자에게 테이블 읽기·쓰기 권한이나 RLS 정책을 주지 않습니다. 실제 온라인 문의는 서버 측 API에서 입력 검증·남용 방지·저장 실패 처리와 개인정보 안내를 구현한 후 연결해야 합니다. 테이블 생성 후 **Table Editor**에서 구조를 확인하고 **Database → Advisors**의 보안 경고를 점검합니다. 테스트 문의는 허가된 서버 경로로 저장하고, 대시보드에서 저장 여부를 확인합니다.

공식 참고: [Supabase 테이블과 RLS](https://supabase.com/docs/guides/database/tables), [API 키 구분](https://supabase.com/docs/guides/getting-started/api-keys), [Vercel 환경 변수](https://vercel.com/docs/environment-variables).
