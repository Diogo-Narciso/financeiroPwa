import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type pg from "pg";
import { createPool } from "./client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function migrationsDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "infra/migrations"),
    path.resolve(process.cwd(), "../../infra/migrations"),
    path.resolve(__dirname, "../../../infra/migrations"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return candidates[0]!;
}

async function ensureMigrationsTable(client: pg.PoolClient): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function listMigrationFiles(): Promise<string[]> {
  const dir = migrationsDir();
  const entries = await readdir(dir);
  return entries
    .filter((name) => /^\d+_.*\.sql$/i.test(name))
    .sort((a, b) => a.localeCompare(b, "en"));
}

export async function getMigrationStatus(databaseUrl?: string) {
  const pool = createPool(databaseUrl);
  const client = await pool.connect();
  try {
    await ensureMigrationsTable(client);
    const files = await listMigrationFiles();
    const { rows } = await client.query<{ id: string }>(
      "SELECT id FROM schema_migrations ORDER BY id",
    );
    const applied = new Set(rows.map((r) => r.id));
    return files.map((file) => ({
      id: file,
      status: applied.has(file) ? ("applied" as const) : ("pending" as const),
    }));
  } finally {
    client.release();
    await pool.end();
  }
}

export async function runMigrations(databaseUrl?: string): Promise<{
  applied: string[];
  alreadyApplied: string[];
}> {
  const pool = createPool(databaseUrl);
  const client = await pool.connect();
  const applied: string[] = [];
  const alreadyApplied: string[] = [];
  try {
    await ensureMigrationsTable(client);
    const files = await listMigrationFiles();
    for (const file of files) {
      const { rows } = await client.query<{ id: string }>(
        "SELECT id FROM schema_migrations WHERE id = $1",
        [file],
      );
      if (rows.length > 0) {
        alreadyApplied.push(file);
        continue;
      }
      const sql = await readFile(path.join(migrationsDir(), file), "utf8");
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (id) VALUES ($1)", [file]);
        await client.query("COMMIT");
        applied.push(file);
      } catch (error) {
        await client.query("ROLLBACK");
        throw new Error(
          `Migration failed: ${file}\n${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
    return { applied, alreadyApplied };
  } finally {
    client.release();
    await pool.end();
  }
}
