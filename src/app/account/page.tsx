"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import styles from "../auth.module.css";

type Profile = { id: string; username: string; full_name: string; company_name: string };

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        router.replace("/login");
        return;
      }
      const { data, error } = await supabase.from("member_profiles")
        .select("id,username,full_name,company_name")
        .eq("id", user.id)
        .single();
      if (!active) return;
      if (error || !data) {
        setErrorMessage("회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setProfile(data);
        setFullName(data.full_name);
        setCompanyName(data.company_name);
        setIsAdmin(user.app_metadata?.role === "admin");
      }
      setLoading(false);
    }
    void loadProfile();
    return () => { active = false; };
  }, [router]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    const { error } = await getSupabase().from("member_profiles")
      .update({ full_name: fullName.trim(), company_name: companyName.trim(), updated_at: new Date().toISOString() })
      .eq("id", profile.id);
    if (error) setErrorMessage("정보를 저장하지 못했습니다. 다시 시도해 주세요.");
    else setMessage("회원 정보가 저장되었습니다.");
    setBusy(false);
  }

  async function handleSignOut() {
    setBusy(true);
    await getSupabase().auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <main className={styles.shell}>
      <div className={styles.card}>
        <Link className={styles.back} href="/">← 홈페이지</Link>
        <p className={styles.eyebrow}>MY ACCOUNT</p>
        <h1 className={styles.title}>내 계정</h1>
        {loading ? <p className={styles.intro} role="status">회원 정보를 불러오는 중…</p> : profile && <>
          <p className={styles.intro}>본인의 회원 정보를 확인하고 수정할 수 있습니다.</p>
          <dl className={styles.profileMeta}><dt>아이디</dt><dd>{profile.username}</dd><dt>권한</dt><dd>{isAdmin ? "관리자" : "일반 회원"}</dd></dl>
          <form className={styles.form} onSubmit={handleSave}>
            <label className={styles.field}>이름
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} maxLength={80} autoComplete="name" />
            </label>
            <label className={styles.field}>회사명
              <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} maxLength={120} autoComplete="organization" />
            </label>
            <button className={styles.button} disabled={busy} type="submit">{busy ? "저장 중…" : "정보 저장"}</button>
          </form>
          {isAdmin && <p className={styles.switch}><Link href="/admin/members">전체 회원 목록 보기 →</Link></p>}
          <div className={styles.actions}><button className={[styles.button, styles.secondary].join(" ")} disabled={busy} onClick={handleSignOut} type="button">로그아웃</button></div>
        </>}
        {errorMessage && <p className={[styles.status, styles.error].join(" ")} role="alert">{errorMessage}</p>}
        {message && <p className={styles.status} role="status">{message}</p>}
      </div>
    </main>
  );
}