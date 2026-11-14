import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { getPool } from "./db";
import { audit } from "./session";
import { readStoredOriginal, sha256, storageRoot } from "./storage";

export class ExportError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "ExportError";
    this.code = code;
    this.status = status;
  }
}

function csvEscape(value: string | null | undefined): string {
  const v = value ?? "";
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export async function approveBookkeepingCfop(args: {
  tenantId: string;
  actorUserId: string;
  itemId: string;
  bookkeepingCfop: string;
  reason: string;
}) {
  if (!args.reason.trim()) {
    throw new ExportError("REASON_REQUIRED", "Motivo obrigatório para CFOP de escrituração.");
  }
  const cfop = args.bookkeepingCfop.replace(/\D/g, "");
  if (cfop.length < 4) {
    throw new ExportError("INVALID_CFOP", "CFOP de escrituração inválido.");
  }
  const pool = getPool();
  const item = await pool.query<{
    id: string;
    company_id: string;
    cfop_issuer: string | null;
  }>(
    `SELECT id, company_id, cfop_issuer FROM invoice_items WHERE id = $1 AND tenant_id = $2`,
    [args.itemId, args.tenantId],
  );
  if (!item.rows[0]) throw new ExportError("ITEM_NOT_FOUND", "Item não encontrado.", 404);

  const { rows } = await pool.query(
    `INSERT INTO item_bookkeeping_cfop
       (tenant_id, company_id, invoice_item_id, issuer_cfop, bookkeeping_cfop, reason, approved_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id, issuer_cfop, bookkeeping_cfop, reason, created_at`,
    [
      args.tenantId,
      item.rows[0].company_id,
      args.itemId,
      item.rows[0].cfop_issuer,
      cfop,
      args.reason.trim(),
      args.actorUserId,
    ],
  );
  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "bookkeeping_cfop.approved",
    entityType: "invoice_item",
    entityId: args.itemId,
    detail: {
      issuerCfop: item.rows[0].cfop_issuer,
      bookkeepingCfop: cfop,
      xmlUnchanged: true,
    },
  });
  return rows[0];
}

export async function buildExportZip(args: {
  tenantId: string;
  companyId: string;
  actorUserId: string;
}) {
  const pool = getPool();
  const company = await pool.query(
    `SELECT id, cnpj, legal_name FROM companies WHERE id = $1 AND tenant_id = $2`,
    [args.companyId, args.tenantId],
  );
  if (!company.rows[0]) throw new ExportError("COMPANY_NOT_FOUND", "Empresa não encontrada.", 404);

  const docs = await pool.query<{
    id: string;
    access_key: string | null;
    sha256: string;
    storage_path: string;
    original_filename: string;
    status: string;
  }>(
    `SELECT id, access_key, sha256, storage_path, original_filename, status
     FROM source_documents
     WHERE tenant_id = $1 AND company_id = $2 AND direction = 'entry' AND status = 'parsed'
     ORDER BY created_at`,
    [args.tenantId, args.companyId],
  );

  const items = await pool.query(
    `SELECT i.id, i.item_number, i.description, i.ncm, i.cfop_issuer, h.access_key, h.number, h.series,
            d.purpose AS decided_purpose,
            s.purpose AS suggested_purpose,
            b.bookkeeping_cfop, b.reason AS cfop_reason,
            m.action AS manual_action, m.reason AS manual_reason
     FROM invoice_items i
     JOIN invoice_headers h ON h.id = i.invoice_id
     LEFT JOIN LATERAL (
       SELECT purpose FROM item_classification_decisions x
       WHERE x.invoice_item_id = i.id ORDER BY created_at DESC LIMIT 1
     ) d ON TRUE
     LEFT JOIN item_classification_suggestions s ON s.invoice_item_id = i.id
     LEFT JOIN LATERAL (
       SELECT bookkeeping_cfop, reason FROM item_bookkeeping_cfop y
       WHERE y.invoice_item_id = i.id ORDER BY created_at DESC LIMIT 1
     ) b ON TRUE
     LEFT JOIN LATERAL (
       SELECT action, reason FROM manual_tax_decisions z
       WHERE z.invoice_item_id = i.id AND z.revoked_at IS NULL
       ORDER BY created_at DESC LIMIT 1
     ) m ON TRUE
     WHERE i.tenant_id = $1 AND i.company_id = $2
     ORDER BY h.access_key, i.item_number`,
    [args.tenantId, args.companyId],
  );

  const zip = new JSZip();
  const originalHashes: { filename: string; sha256: string; accessKey: string | null }[] = [];

  for (const doc of docs.rows) {
    const bytes = await readStoredOriginal(doc.storage_path);
    const digest = sha256(bytes);
    if (digest !== doc.sha256) {
      throw new ExportError(
        "HASH_MISMATCH",
        `Integridade quebrada para ${doc.original_filename}: hash divergente.`,
        500,
      );
    }
    const name = `${doc.access_key ?? doc.sha256}.xml`;
    // Write exact original bytes — no reformat.
    zip.file(`originais/${name}`, bytes);
    originalHashes.push({
      filename: name,
      sha256: digest,
      accessKey: doc.access_key,
    });
  }

  const mapHeader =
    "access_key,series,number,item_number,description,ncm,issuer_cfop,bookkeeping_cfop,purpose,cfop_reason\n";
  const mapLines = items.rows.map((r) =>
    [
      r.access_key,
      r.series,
      r.number,
      r.item_number,
      r.description,
      r.ncm,
      r.cfop_issuer,
      r.bookkeeping_cfop,
      r.decided_purpose ?? r.suggested_purpose,
      r.cfop_reason,
    ]
      .map((x) => csvEscape(x == null ? "" : String(x)))
      .join(","),
  );
  zip.file("mapeamento_cfop/entrada_itens.csv", mapHeader + mapLines.join("\n") + "\n");

  const memHeader =
    "access_key,item_number,manual_action,manual_reason,disclaimer\n";
  const memLines = items.rows.map((r) =>
    [
      r.access_key,
      r.item_number,
      r.manual_action,
      r.manual_reason,
      r.manual_action
        ? "MANUAL — ESCOLHA DO USUÁRIO"
        : "Seguir análise / pendente",
    ]
      .map((x) => csvEscape(x == null ? "" : String(x)))
      .join(","),
  );
  zip.file("apuracao/memoria_calculo.csv", memHeader + memLines.join("\n") + "\n");

  const pendHeader = "access_key,item_number,description,reason\n";
  const pend = items.rows.filter(
    (r) => !r.decided_purpose || r.decided_purpose === "indeterminado" || !r.bookkeeping_cfop,
  );
  const pendLines = pend.map((r) =>
    [
      r.access_key,
      r.item_number,
      r.description,
      !r.bookkeeping_cfop
        ? "CFOP escrituração pendente"
        : "Finalidade pendente/indeterminada",
    ]
      .map((x) => csvEscape(x == null ? "" : String(x)))
      .join(","),
  );
  zip.file("pendencias/itens_nao_aprovados.csv", pendHeader + pendLines.join("\n") + "\n");

  zip.file(
    "erp/README.txt",
    "Adaptador ERP genérico apenas. Nenhum ERP marcado como homologado sem importação real.\n",
  );

  const manifest = {
    schema_version: "1.0",
    generated_at: new Date().toISOString(),
    company: {
      id: company.rows[0].id,
      cnpj: company.rows[0].cnpj,
      legal_name: company.rows[0].legal_name,
    },
    originals: originalHashes,
    policy: {
      xml_authorized_immutable: true,
      bookkeeping_cfop_auxiliary_only: true,
      erp_homologated: false,
    },
    counts: {
      originals: originalHashes.length,
      items: items.rows.length,
      pendencias: pend.length,
    },
  };
  zip.file("auditoria/manifesto.json", JSON.stringify(manifest, null, 2));

  const zipBytes = Buffer.from(await zip.generateAsync({ type: "uint8array" }));
  const zipHash = createHash("sha256").update(zipBytes).digest("hex");
  const relative = path.join(
    args.tenantId,
    args.companyId,
    "exports",
    `${zipHash}.zip`,
  );
  const absolute = path.join(storageRoot(), relative);
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, zipBytes);

  const { rows: jobRows } = await pool.query<{ id: string }>(
    `INSERT INTO export_jobs (tenant_id, company_id, status, storage_path, sha256_zip, created_by)
     VALUES ($1,$2,'completed',$3,$4,$5)
     RETURNING id`,
    [args.tenantId, args.companyId, relative, zipHash, args.actorUserId],
  );
  await pool.query(
    `INSERT INTO export_manifests (export_job_id, manifest) VALUES ($1,$2::jsonb)`,
    [jobRows[0]!.id, JSON.stringify(manifest)],
  );
  await audit(pool, {
    tenantId: args.tenantId,
    actorUserId: args.actorUserId,
    action: "export.zip_created",
    entityType: "export_job",
    entityId: jobRows[0]!.id,
    detail: { zipHash, originals: originalHashes.length },
  });

  return {
    exportJobId: jobRows[0]!.id,
    sha256Zip: zipHash,
    storagePath: relative,
    manifest,
    absolutePath: absolute,
  };
}

export async function readExportZip(args: {
  tenantId: string;
  exportJobId: string;
}): Promise<{ bytes: Buffer; filename: string }> {
  const pool = getPool();
  const { rows } = await pool.query<{ storage_path: string; sha256_zip: string }>(
    `SELECT storage_path, sha256_zip FROM export_jobs WHERE id = $1 AND tenant_id = $2`,
    [args.exportJobId, args.tenantId],
  );
  if (!rows[0]) throw new ExportError("NOT_FOUND", "Exportação não encontrada.", 404);
  const bytes = await readFile(path.join(storageRoot(), rows[0].storage_path));
  const digest = sha256(bytes);
  if (digest !== rows[0].sha256_zip) {
    throw new ExportError("ZIP_HASH_MISMATCH", "ZIP corrompido.", 500);
  }
  return { bytes, filename: `export-${args.exportJobId}.zip` };
}
