import { createPool } from "@portal-difal/db";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type pg from "pg";

let pool: pg.Pool | null = null;

function ensureEnv(): void {
  if (process.env.DATABASE_URL) return;
  const candidates = [
    path.resolve(process.cwd(), "../../.env"),
    path.resolve(process.cwd(), ".env"),
  ];
  for (const file of candidates) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const eq = trimmed.indexOf("=");
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
    break;
  }
}

export function getPool(): pg.Pool {
  ensureEnv();
  if (!pool) pool = createPool(process.env.DATABASE_URL);
  return pool;
}
