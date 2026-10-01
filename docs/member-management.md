# 회원 가입 및 관리

회원 로그인은 아이디와 비밀번호를 사용하며 이메일을 입력받지 않습니다. Supabase Auth의 이메일/비밀번호 인증 기능에 내부 식별용 주소(아이디 + @members.homepage.example.com)를 사용합니다. 이 주소로 메일이 전달되지 않으므로 이메일 인증과 이메일 비밀번호 재설정은 사용할 수 없습니다.

회원 데이터는 Supabase 프로젝트 ac_ingins (zbokfwjsygjfctgobutw)에 저장됩니다. auth.users가 비밀번호를 관리하고 public.member_profiles가 아이디·이름·회사명·가입일을 저장합니다. 테이블은 RLS로 본인 정보만 읽고 수정하도록 제한합니다. 관리자만 전체 회원 목록을 읽을 수 있습니다. 운영자 권한은 사용자가 수정할 수 없는 app_metadata.role = admin으로 판단합니다.

## 배포 전 설정

1. Supabase 대시보드에서 ac_ingins → Authentication → Providers → Email로 이동합니다.
2. 이메일 로그인은 켜 두고 Confirm email을 끕니다. 이메일을 받지 않는 회원가입에는 이 설정이 필수입니다.
3. 공개 회원가입(Allow new users to sign up)이 켜져 있는지 확인합니다.
4. 설정 후 사이트의 /signup에서 계정을 만들고 /login에서 로그인합니다.

관리자 아이디는 아직 정하지 않았습니다. 관리자 계정이 가입된 뒤 해당 계정의 신원을 확인하고 Supabase Auth의 app_metadata.role을 admin으로 지정해야 /admin/members에서 전체 목록을 볼 수 있습니다. 일반 가입 화면에서 관리자 권한을 지정할 수 없습니다. 권한을 부여한 뒤에는 로그아웃 후 다시 로그인해 새 토큰을 받습니다.

아이디를 잊거나 비밀번호를 분실한 경우 자동 이메일 복구는 제공되지 않습니다. 운영자가 Supabase Auth 관리자 기능으로 계정을 확인하고 복구해야 합니다.

스키마의 GitHub 보관본은 supabase/migrations/20261001_create_member_profiles.sql입니다. 동일한 변경은 ac_ingins에 이미 적용되어 있으므로 해당 SQL을 다시 실행하지 마세요.
