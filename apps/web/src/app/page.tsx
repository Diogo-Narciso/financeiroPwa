import { APP_NAME, APP_TAGLINE } from "@portal-difal/shared";
import { getHealth } from "@/lib/health";
import styles from "./page.module.css";

const STAGES = [
  { id: "E0", title: "Fundação", detail: "Monorepo, banco, saúde e casca da aplicação.", active: true },
  { id: "E1", title: "Cadastro e teste", detail: "Login, organizações, empresas e quotas.", active: false },
  { id: "E2", title: "Documentos", detail: "Upload XML/ZIP e storage imutável.", active: false },
  { id: "E3+", title: "Motor e escrituração", detail: "Classificação, DIFAL homologado e exportação.", active: false },
] as const;

function statusClass(value: string): string {
  if (value === "ok" || value === "up") return styles.ok ?? "";
  if (value === "degraded" || value === "skipped" || value === "unknown") {
    return styles.warn ?? "";
  }
  return styles.err ?? "";
}

export default async function HomePage() {
  const health = await getHealth();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.mark} aria-hidden>
            PD
          </div>
          <div className={styles.brandText}>
            <p className={styles.brandName}>{APP_NAME}</p>
            <p className={styles.brandMeta}>Oliveira Contabilidade · ambiente local</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.stageBadge}>E0 · Fundação</span>
          <a className={styles.ghostLink} href="/api/health">
            /api/health
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Casca inicial — sem produto completo</p>
          <h1 className={styles.title}>{APP_NAME}</h1>
          <p className={styles.lede}>{APP_TAGLINE}</p>
        </section>

        <section className={styles.statusPanel} aria-labelledby="status-title">
          <div className={styles.statusHeader}>
            <h2 id="status-title" className={styles.statusTitle}>
              Estado da fundação
            </h2>
            <p className={styles.statusHint}>
              Sem regras fiscais inventadas nesta etapa. PWA/mobile na mesma API depois.
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Serviço</p>
              <p className={`${styles.metricValue} ${statusClass(health.status)}`}>
                {health.status}
              </p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Postgres</p>
              <p className={`${styles.metricValue} ${statusClass(health.checks.database)}`}>
                {health.checks.database}
              </p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Versão</p>
              <p className={styles.metricValue}>{health.version}</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricLabel}>Checado em</p>
              <p className={styles.metricValue}>
                {new Date(health.timestamp).toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
          <p className={styles.note}>
            Esta tela é apenas a casca E0: monorepo TypeScript, migrações
            reproduzíveis e rota de saúde. Login, quotas, importação XML, motor
            DIFAL e cliente PWA/mobile entram nas etapas seguintes.
          </p>
        </section>

        <section className={styles.roadmap} aria-labelledby="roadmap-title">
          <h2 id="roadmap-title" className={styles.roadmapTitle}>
            Roteiro de entregas
          </h2>
          <ul className={styles.roadmapList}>
            {STAGES.map((stage) => (
              <li key={stage.id} data-active={stage.active}>
                <span className={styles.stepId}>{stage.id}</span>
                <div className={styles.stepBody}>
                  <strong>{stage.title}</strong>
                  <span>{stage.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        Documentação de produto em <code>docs/</code>. Decisão fiscal final é do
        usuário/contador. Canais web + mobile/PWA, mesmo backend.
      </footer>
    </div>
  );
}
