#!/usr/bin/env bash
# H13 / E7: backup/restore drill for local Postgres.
# Does NOT claim production managed backup is configured (P13 remains partially open).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESTORE_CHECK=0
for arg in "$@"; do
  case "$arg" in
    --restore-check) RESTORE_CHECK=1 ;;
    --help|-h)
      echo "Usage: $0 [--restore-check] [out_dir]"
      exit 0
      ;;
  esac
done

# Positional out dir (ignore flags)
OUT_DIR="$ROOT/storage/backups"
for arg in "$@"; do
  if [[ "$arg" != --* ]]; then
    OUT_DIR="$arg"
  fi
done

# shellcheck disable=SC1091
if [[ -f "$ROOT/.env" ]]; then
  set -a
  DATABASE_URL="$(grep -E '^DATABASE_URL=' "$ROOT/.env" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'")"
  set +a
fi
DATABASE_URL="${DATABASE_URL:-postgresql://portal:portal@127.0.0.1:5432/portal_difal}"

mkdir -p "$OUT_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
DUMP="$OUT_DIR/portal_difal_${STAMP}.sql"
META="$OUT_DIR/last-drill.json"

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "[e7-drill] FAIL: pg_dump not found in PATH" >&2
  exit 2
fi

echo "[e7-drill] dumping to $DUMP"
if ! pg_dump "$DATABASE_URL" --no-owner --no-acl > "$DUMP"; then
  echo "[e7-drill] FAIL: pg_dump failed (is Postgres up? DATABASE_URL ok?)" >&2
  rm -f "$DUMP"
  exit 3
fi

BYTES="$(wc -c < "$DUMP" | tr -d ' ')"
if [[ "${BYTES:-0}" -lt 100 ]]; then
  echo "[e7-drill] FAIL: dump too small (${BYTES} bytes) — refusing empty artifact" >&2
  exit 4
fi
echo "[e7-drill] dump bytes=$BYTES"

MODE="dump_only"
RESTORE_OK="false"

if [[ "$RESTORE_CHECK" -eq 1 ]]; then
  if ! command -v psql >/dev/null 2>&1; then
    echo "[e7-drill] FAIL: psql required for --restore-check" >&2
    exit 2
  fi
  SCRATCH="${DRILL_RESTORE_DB:-portal_difal_drill_restore}"
  # Derive admin URL pointing at postgres maintenance DB
  ADMIN_URL="$(echo "$DATABASE_URL" | sed -E 's#/[^/]+$#/postgres#')"
  echo "[e7-drill] restore-check into scratch DB=$SCRATCH"
  psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS ${SCRATCH};" >/dev/null
  psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "CREATE DATABASE ${SCRATCH};" >/dev/null
  SCRATCH_URL="$(echo "$DATABASE_URL" | sed -E "s#/[^/]+\$#/${SCRATCH}#")"
  psql "$SCRATCH_URL" -v ON_ERROR_STOP=1 -f "$DUMP" >/dev/null
  psql "$SCRATCH_URL" -v ON_ERROR_STOP=1 -c "SELECT 1;" >/dev/null
  psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS ${SCRATCH};" >/dev/null
  MODE="dump_and_restore_check"
  RESTORE_OK="true"
  echo "[e7-drill] restore-check OK"
else
  echo "[e7-drill] restore dry-run hint: psql \"\$DATABASE_URL\" -f \"$DUMP\""
  echo "[e7-drill] tip: re-run with --restore-check for scratch DB apply"
fi

cat > "$META" <<EOF
{
  "stamp": "$STAMP",
  "dump": "$DUMP",
  "bytes": $BYTES,
  "mode": "$MODE",
  "restoreCheckOk": $RESTORE_OK,
  "story": "H13",
  "productionManagedBackup": false,
  "note": "Local drill only — does not close full P13 (domain/support/managed backup)."
}
EOF
echo "[e7-drill] wrote $META"
echo "[e7-drill] OK — local drill evidence recorded; production P13 still partially open."
