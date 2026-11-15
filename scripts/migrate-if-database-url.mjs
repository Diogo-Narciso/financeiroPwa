#!/usr/bin/env node
/**
 * Host publish may not inject DATABASE_URL at build time.
 * Skip migrate cleanly so Next build can proceed; runtime
 * instrumentation + getReadyPool apply schema when the URL exists.
 */
import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL?.trim()) {
  console.log("migrate-if-database-url: DATABASE_URL unset — skip migrate at build");
  process.exit(0);
}

const result = spawnSync(
  "pnpm",
  ["--filter", "@portal-difal/db", "migrate"],
  { stdio: "inherit", shell: process.platform === "win32" },
);
process.exit(result.status ?? 1);
