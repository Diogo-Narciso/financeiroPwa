import pg from "pg";

const { Pool } = pg;

export function createPool(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Copy .env.example to .env or export the variable.",
    );
  }
  return new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 10_000,
  });
}

export async function checkDatabase(
  databaseUrl = process.env.DATABASE_URL,
): Promise<"up" | "down" | "skipped"> {
  if (!databaseUrl) return "skipped";
  const pool = createPool(databaseUrl);
  try {
    await pool.query("SELECT 1");
    return "up";
  } catch {
    return "down";
  } finally {
    await pool.end();
  }
}
