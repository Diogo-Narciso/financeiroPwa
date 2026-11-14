import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from "../ui.module.css";
import { getPool } from "@/server/db";
import { SESSION_COOKIE, readSessionUser } from "@/server/session";
import { LogoutButton } from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function EmpresasPage() {
  const jar = await cookies();
  const user = await readSessionUser(jar.get(SESSION_COOKIE)?.value);
  if (!user) redirect("/login");

  const { rows } = await getPool().query<{
    id: string;
    cnpj: string;
    legal_name: string;
    uf: string | null;
    archived_at: string | null;
  }>(
    `SELECT id, cnpj, legal_name, uf, archived_at
     FROM companies WHERE tenant_id = $1 ORDER BY created_at ASC`,
    [user.tenantId],
  );

  return (
    <>
      <header className={styles.nav}>
        <Link href="/painel" className={styles.brand}>
          Empresas
        </Link>
        <div className={styles.navLinks}>
          <Link href="/painel">Painel</Link>
          <Link href="/empresas/nova">Nova</Link>
          <LogoutButton />
        </div>
      </header>
      <main className={styles.page}>
        <div className={styles.stack}>
          <div>
            <h1 className={styles.h1}>Minhas empresas</h1>
            <p className={styles.muted}>
              Estabelecimentos (CNPJ) da organização {user.orgName}.
            </p>
          </div>
          <div className={styles.card}>
            {rows.length === 0 ? (
              <p className={styles.muted}>
                Nenhuma empresa ainda.{" "}
                <Link href="/empresas/nova">Cadastrar a primeira</Link>.
              </p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>CNPJ</th>
                    <th>Razão social</th>
                    <th>UF</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(
                  (row: {
                    id: string;
                    cnpj: string;
                    legal_name: string;
                    uf: string | null;
                    archived_at: string | null;
                  }) => (
                    <tr key={row.id}>
                      <td>
                        <Link href={`/empresas/${row.id}`}>{row.cnpj}</Link>
                      </td>
                      <td>{row.legal_name}</td>
                      <td>{row.uf ?? "—"}</td>
                      <td>{row.archived_at ? "Arquivada" : "Ativa"}</td>
                    </tr>
                  ),
                )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
