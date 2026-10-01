"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, isValidUsername, normalizeUsername, usernameToAuthEmail } from "@/lib/supabase/client";
import styles from "../auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = normalizeUsername(username);
    if (!isValidUsername(id)) {
      setMessage("아이디는 영문 소문자로 시작하는 4~24자의 영문 소문자·숫자·밑줄이어야 합니다.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const { error } = await getSupabase().auth.signInWithPassword({
        email: usernameToAuthEmail(id),
        password,
      });
      if (error) throw error;
      router.replace("/account");
      router.refresh();
    } catch {
      setMessage("로그인하지 못했습니다. 아이디와 비밀번호를 확인해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.shell}>
      <div className={styles.card}>
        <Link className={styles.back} href="/">← 홈페이지</Link>
        <p className={styles.eyebrow}>MEMBER LOGIN</p>
        <h1 className={styles.title}>회원 로그인</h1>
        <p className={styles.intro}>아이디와 비밀번호로 계정에 로그인하세요.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>아이디
            <input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required maxLength={24} />
          </label>
          <label className={styles.field}>비밀번호
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <button className={styles.button} disabled={busy} type="submit">{busy ? "로그인 중…" : "로그인"}</button>
        </form>
        {message && <p className={[styles.status, styles.error].join(" ")} role="alert">{message}</p>}
        <p className={styles.switch}>계정이 없으신가요? <Link href="/signup">회원가입</Link></p>
      </div>
    </main>
  );
}