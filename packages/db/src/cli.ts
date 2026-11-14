#!/usr/bin/env node
import { loadEnvFile } from "./load-env";
import { getMigrationStatus, runMigrations } from "./migrate";

async function main() {
  loadEnvFile();
  const command = process.argv[2] ?? "migrate";
  if (command === "migrate") {
    const result = await runMigrations();
    if (result.applied.length === 0) console.log("No pending migrations.");
    else {
      console.log("Applied:");
      for (const id of result.applied) console.log(`  ✓ ${id}`);
    }
    if (result.alreadyApplied.length > 0) {
      console.log(`Already applied: ${result.alreadyApplied.length}`);
    }
    return;
  }
  if (command === "status") {
    const rows = await getMigrationStatus();
    for (const row of rows) {
      const mark = row.status === "applied" ? "✓" : "·";
      console.log(`${mark} ${row.id} (${row.status})`);
    }
    return;
  }
  console.error(`Unknown command: ${command}`);
  console.error("Usage: portal-difal-migrate <migrate|status>");
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
