#!/usr/bin/env bash
# E7 scaffold: backup/restore drill for local Postgres.
# Does NOT claim production backup is configured (P13 / L13 remain open).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
if [[ -f "$ROOT/.env" ]]; then
  set -a
  # Avoid word-splitting issues on APP_NAME with spaces — only load DATABASE_URL
  DATABASE_URL="$(grep -E '^DATABASE_URL=' "$ROOT/.env" | head -1 | cut -d= -f2-)"
  set +a
fi
DATABASE_URL="${DATABASE_URL:-postgresql://portal:portal@127.0.0.1:5432/portal_difal}"
OUT_DIR="${1:-$ROOT/storage/backups}"
mkdir -p "$OUT_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
DUMP="$OUT_DIR/portal_difal_${STAMP}.sql"

echo "[e7-drill] dumping to $DUMP"
pg_dump "$DATABASE_URL" --no-owner --no-acl > "$DUMP"
BYTES="$(wc -c < "$DUMP" | tr -d ' ')"
echo "[e7-drill] dump bytes=$BYTES"
echo "[e7-drill] restore dry-run: psql "\$DATABASE_URL" -f "$DUMP""
echo "[e7-drill] PENDING: ensaiar restore em ambiente controlado e registrar evidência em L13/P13."
echo "[e7-drill] OK scaffold — não marca checklist como done."
