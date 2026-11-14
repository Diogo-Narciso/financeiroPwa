import Link from "next/link";
import { APP_NAME } from "@portal-difal/shared";
import styles from "@/app/ui.module.css";

export function AppNav(props: {
  email?: string | null;
  orgName?: string | null;
}) {
  return (
    <header className={styles.nav}>
      <Link href="/painel" className={styles.brand}>
        {APP_NAME}
      </Link>
      <div className={styles.navLinks}>
        <Link href="/painel">Painel</Link>
        <Link href="/empresas">Empresas</Link>
        {props.orgName ? (
          <span className={styles.chip}>{props.orgName}</span>
        ) : null}
        {props.email ? <span className={styles.muted}>{props.email}</span> : null}
        <form action="/api/auth/logout" method="post">
          {/* logout via client button on pages */}
        </form>
      </div>
    </header>
  );
}
