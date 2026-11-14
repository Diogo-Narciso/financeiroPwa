import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { TRIAL_LIMITS } from "@portal-difal/shared";
import styles from "../ui.module.css";
import { getQuotaSnapshot } from "@/server/quotas";
import { SESSION_COOKIE, readSessionUser } from "@/server/session";
import { LogoutButton } from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function PainelPage() {
  const jar = await cookies();
  const user = await readSessionUser(jar.get(SESSION_COOKIE)?.value);
  if (!user) redirect("/login");
  const quotas = await getQuotaSnapshot(user.tenantId);

  return (
    <>
      <header className={styles.nav}>
        <Link href="/painel" className={styles.brand}>
          Painel
        </Link>
        <div className={styles.navLinks}>
          <Link href="/empresas">Empresas</Link>
          <Link href="/importar">Importar</Link>
          <Link href="/analises">Análises</Link>
          <Link href="/calculo">Cálculo</Link>
          <Link href="/exportacoes">Exportações</Link>
          <Link href="/planos">Planos</Link>
          <Link href="/homologacao">Homologação</Link>
          <span className={styles.chip}>{user.orgName}</span>
          <span className={styles.muted}>{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      <main className={styles.page}>
        <div className={styles.stack}>
          <div>
            <h1 className={styles.h1}>Olá{user.displayName ? `, ${user.displayName}` : ""}</h1>
            <p className={styles.muted}>
              Organização <strong>{user.orgName}</strong> ({user.orgKind}) · papel{" "}
              {user.role}. E0–E6 no ar · homologação em{" "}
              <Link href="/homologacao">/homologacao</Link>.
            </p>
          </div>
          <section className={`${styles.card} ${styles.stack}`}>
            <h2 style={{ margin: 0, fontSize: "1.05rem" }}>Cotas do teste gratuito</h2>
            <p className={styles.muted}>
              Limites no servidor: {TRIAL_LIMITS.maxCompaniesPerOrg} CNPJs / organização e{" "}
              {TRIAL_LIMITS.maxEntryInvoicesPerCompany} NF-e de entrada / CNPJ. Arquivar
              empresa não libera vaga. Sem alíquotas inventadas nesta etapa.
            </p>
            <div className={styles.row}>
              <div>
                <div className={styles.muted}>CNPJs vinculados</div>
                <strong>
                  {quotas.companies.used} / {quotas.companies.limit}
                </strong>
              </div>
              <div>
                <div className={styles.muted}>Vagas restantes</div>
                <strong>{quotas.companies.remaining}</strong>
              </div>
            </div>
            <Link className={styles.btn} href="/empresas/nova" style={{ width: "fit-content" }}>
              Cadastrar empresa
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
