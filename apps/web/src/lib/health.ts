import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { HealthResponse } from "@portal-difal/shared";
import { checkDatabase } from "@portal-difal/db";
import { getReadyPool } from "@/server/db";

/** Load repo-root `.env` when Next only saw `apps/web/.env`. */
function ensureDatabaseUrl(): void {
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

export async function getHealth(): Promise<HealthResponse> {
  ensureDatabaseUrl();
  // Warm schema on published empty DBs (no instrumentation at build time).
  if (process.env.DATABASE_URL) {
    try {
      await getReadyPool();
    } catch {
      /* checkDatabase below reports down */
    }
  }
  const database = await checkDatabase(process.env.DATABASE_URL);
  const status: HealthResponse["status"] =
    database === "up" ? "ok" : database === "skipped" ? "degraded" : "error";
  return {
    status,
    service: "portal-difal-web",
    version: process.env.npm_package_version ?? "0.0.1",
    timestamp: new Date().toISOString(),
    checks: { database },
  };
}
