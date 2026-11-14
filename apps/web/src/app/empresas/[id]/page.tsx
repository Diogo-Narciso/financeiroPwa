import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from "../../ui.module.css";
import { getPool } from "@/server/db";
import { getQuotaSnapshot } from "@/server/quotas";
import { SESSION_COOKIE, readSessionUser } from "@/server/session";
import { CompanyProfilesForm } from "./CompanyProfilesForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EmpresaDetailPage({ params }: Props) {
  const { id } = await params;
  const jar = await cookies();
  const user = await readSessionUser(jar.get(SESSION_COOKIE)?.value);
  if (!user) redirect("/login");

  const { rows } = await getPool().query(
    `SELECT id, cnpj, legal_name, trade_name, uf, municipality, archived_at
     FROM companies WHERE id = $1 AND tenant_id = $2`,
    [id, user.tenantId],
  );
  const company = rows[0];
  if (!company) notFound();
  const quotas = await getQuotaSnapshot(user.tenantId, id);

  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <div>
          <p className={styles.muted}>
            <Link href="/empresas">← Empresas</Link>
          </p>
          <h1 className={styles.h1}>{company.legal_name}</h1>
          <p className={styles.muted}>
            CNPJ {company.cnpj}
            {company.uf ? ` · ${company.uf}` : ""}
            {company.municipality ? ` · ${company.municipality}` : ""}
            {company.archived_at ? " · arquivada" : ""}
          </p>
        </div>
        <section className={styles.card}>
          <div className={styles.muted}>Cota NF-e de entrada (teste)</div>
          <strong>
            {quotas.entryInvoices?.used ?? 0} / {quotas.entryInvoices?.limit ?? 5}
          </strong>
        </section>
        <CompanyProfilesForm companyId={id} />
      </div>
    </main>
  );
}
