/**
 * Ensure the app Postgres schema exists on cold start (published host
 * provisions an empty DATABASE_URL database; local already migrates via CLI).
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  if (!process.env.DATABASE_URL) return;
  try {
    const { runMigrations } = await import("@portal-difal/db");
    const result = await runMigrations(process.env.DATABASE_URL);
    if (result.applied.length > 0) {
      console.info(
        `[portal-difal] applied migrations: ${result.applied.join(", ")}`,
      );
    }
  } catch (error) {
    console.error("[portal-difal] migration bootstrap failed", error);
  }
}
