"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/ui.module.css";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles.btnSecondary}`}
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
    >
      Sair
    </button>
  );
}
