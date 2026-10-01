"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, isValidUsername, normalizeUsername, usernameToAuthEmail } from "@/lib/supabase/client";
import styles from "../auth.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = normalizeUsername(username);
    setMessage("");
    setErrorMessage("");
    if (!isValidUsername(id)) {
      setErrorMessage("아이디는 영문 소문자로 시작하는 4~24자의 영문 소문자·숫자·밑줄이어야 합니다.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자 이상 입력해 주세요.");
      return;
    }
    if (password !== confirm) {
      setErrorMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await getSupabase().auth.signUp({
        email: usernameToAuthEmail(id),
        password,
        options: { data: { username: id } },
      });
      if (error) throw error;
      if (!data.session) {
        setErrorMessage("계정이 생성됐지만 현재 프로젝트에서 이메일 확인이 필요합니다. 이 사이트는 이메일을 수집하지 않으므로 운영자에게 설정을 문의해 주세요.");
        return;
      }
      setMessage("가입이 완료되었습니다. 내 계정으로 이동합니다.");
      router.replace("/account");
      router.refresh();
    } catch {
      setErrorMessage("가입하지 못했습니다. 아이디가 이미 사용 중이거나 잠시 후 다시 시도해야 할 수 있습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.shell}>
      <div className={styles.card}>
        <Link className={styles.back} href="/">← 홈페이지</Link>
        <p className={styles.eyebrow}>CREATE ACCOUNT</p>
        <h1 className={styles.title}>회원가입</h1>
        <p className={styles.intro}>이메일 없이 아이디와 비밀번호로 가입합니다. 비밀번호를 잊으면 이메일로 재설정할 수 없으므로 운영자에게 문의해야 합니다.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>아이디
            <input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required minLength={4} maxLength={24} pattern="[a-z][a-z0-9_]{3,23}" aria-describedby="username-hint" />
            <span id="username-hint" className={styles.hint}>영문 소문자로 시작, 4~24자의 영문 소문자·숫자·밑줄</span>
          </label>
          <label className={styles.field}>비밀번호
            <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
          </label>
          <label className={styles.field}>비밀번호 확인
            <input type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} required minLength={8} />
          </label>
          <button className={styles.button} disabled={busy} type="submit">{busy ? "가입 중…" : "회원가입"}</button>
        </form>
        {errorMessage && <p className={[styles.status, styles.error].join(" ")} role="alert">{errorMessage}</p>}
        {message && <p className={styles.status} role="status">{message}</p>}
        <p className={styles.switch}>이미 계정이 있으신가요? <Link href="/login">로그인</Link></p>
      </div>
    </main>
  );
}