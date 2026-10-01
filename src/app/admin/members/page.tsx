"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import styles from "../../auth.module.css";

type Member = {
  id: string;
  username: string;
  full_name: string;
  company_name: string;
  created_at: string;
};

export default function MembersPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadMembers() {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        router.replace("/login");
        return;
      }
      if (user.app_metadata?.role !== "admin") {
        setMessage("관리자만 회원 목록을 볼 수 있습니다.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("member_profiles")
        .select("id,username,full_name,company_name,created_at")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) setMessage("회원 목록을 불러오지 못했습니다. 관리자 권한을 확인해 주세요.");
      else setMembers(data ?? []);
      setLoading(false);
    }
    void loadMembers();
    return () => { active = false; };
  }, [router]);

  return (
    <main className={styles.shell}>
      <div className={[styles.card, styles.wide].join(" ")}>
        <Link className={styles.back} href="/account">← 내 계정</Link>
        <p className={styles.eyebrow}>MEMBER MANAGEMENT</p>
        <h1 className={styles.title}>회원 목록</h1>
        {loading ? <p className={styles.intro} role="status">회원 목록을 불러오는 중…</p> :
          message ? <p className={[styles.status, styles.error].join(" ")} role="alert">{message}</p> :
          <>
            <p className={styles.intro}>등록된 회원 {members.length}명</p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead><tr><th scope="col">아이디</th><th scope="col">이름</th><th scope="col">회사명</th><th scope="col">가입일</th></tr></thead>
                <tbody>{members.map((member) =>
                  <tr key={member.id}><td>{member.username}</td><td>{member.full_name || "—"}</td><td>{member.company_name || "—"}</td><td>{new Date(member.created_at).toLocaleDateString("ko-KR")}</td></tr>
                )}</tbody>
              </table>
            </div>
          </>
        }
      </div>
    </main>
  );
}