import { parseNfeXml, NfeParseError, isLikelyXml } from "@portal-difal/nfe-parser";
import type pg from "pg";
import { normalizeCnpj, validateCnpj } from "./cnpj";
import { getPool } from "./db";
import { QuotaError, reserveEntryInvoiceQuota } from "./quotas";
import { audit } from "./session";
import { storeImmutableOriginal } from "./storage";
import { extractXmlsFromZip, ZipSecurityError } from "./zip-safe";

export class ImportError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "ImportError";
    this.code = code;
    this.status = status;
  }
}

export type ImportFileResult = {
  filename: string;
  status: string;
  accessKey?: string;
  sourceDocumentId?: string;
  invoiceId?: string;
  message?: string;
  warnings?: string[];
  created?: boolean;
};

async function commitQuota(
  client: pg.PoolClient,
  args: { tenantId: string; companyId: string; accessKey: string },
) {
  await client.query(
    `UPDATE entry_invoice_usage
     SET status = 'committed', updated_at = NOW()
     WHERE tenant_id = $1 AND company_id = $2 AND access_key = $3
       AND status = 'reserved'`,
    [args.tenantId, args.companyId, args.accessKey],
  );
}

async function releaseQuota(
  client: pg.PoolClient,
  args: { tenantId: string; companyId: string; accessKey: string },
) {
  await client.query(
    `UPDATE entry_invoice_usage
     SET status = 'released', updated_at = NOW()
     WHERE tenant_id = $1 AND company_id = $2 AND access_key = $3
       AND status = 'reserved'`,
    [args.tenantId, args.companyId, args.accessKey],
  );
}

async function processOneXml(args: {
  tenantId: string;
  companyId: string;
  companyCnpj: string;
  actorUserId: string;
  batchId: string;
  filename: string;
  bytes: Buffer;
}): Promise<ImportFileResult> {
  const pool = getPool();

  if (!isLikelyXml(args.bytes)) {
    return {
      filename: args.filename,
      status: "rejected",
      message: "Arquivo não parece XML.",
    };
  }

  let parsed;
  try {
    parsed = parseNfeXml(args.bytes);
  } catch (error) {
    if (error instanceof NfeParseError) {
      await pool.query(
        `INSERT INTO import_errors (tenant_id, batch_id, filename, code, message, detail)
         VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
        [
          args.tenantId,
          args.batchId,
          args.filename,
          error.code,
          error.message,
          "{}",
        ],
      );
      return {
        filename: args.filename,
        status: "rejected",
        message: error.message,
      };
    }
    throw error;
  }

  // Destinatário must match company CNPJ (normalized).
  const dest = parsed.destCnpj ? normalizeCnpj(parsed.destCnpj) : "";
  const companyCnpj = normalizeCnpj(args.companyCnpj);
  if (!dest || dest !== companyCnpj) {
    await pool.query(
      `INSERT INTO import_errors (tenant_id, batch_id, filename, code, message, detail)
       VALUES ($1, $2, $3, 'DEST_CNPJ_MISMATCH', $4, $5::jsonb)`,
      [
        args.tenantId,
        args.batchId,
        args.filename,
        `CNPJ destinatário (${dest || "ausente"}) difere do estabelecimento (${companyCnpj}). Cota não consumida.`,
        JSON.stringify({ dest, companyCnpj, accessKey: parsed.accessKey }),
      ],
    );
    return {
      filename: args.filename,
      status: "rejected",
      accessKey: parsed.accessKey,
      message: "CNPJ destinatário divergente — cota não consumida.",
    };
  }

  const stored = await storeImmutableOriginal({
    tenantId: args.tenantId,
    companyId: args.companyId,
    filename: args.filename,
    bytes: args.bytes,
  });

  // Same bytes already stored → return existing (no new quota).
  const byHash = await pool.query<{
    id: string;
    status: string;
    access_key: string | null;
  }>(
    `SELECT id, status, access_key FROM source_documents
     WHERE tenant_id = $1 AND company_id = $2 AND sha256 = $3`,
    [args.tenantId, args.companyId, stored.sha256],
  );
  if (byHash.rows[0]) {
    const inv = await pool.query<{ id: string }>(
      `SELECT id FROM invoice_headers WHERE source_document_id = $1`,
      [byHash.rows[0].id],
    );
    return {
      filename: args.filename,
      status: "duplicate",
      accessKey: byHash.rows[0].access_key ?? parsed.accessKey,
      sourceDocumentId: byHash.rows[0].id,
      invoiceId: inv.rows[0]?.id,
      message: "Mesmos bytes já importados — sem novo consumo de cota.",
      created: false,
      warnings: parsed.warnings,
    };
  }

  // Same access key, different bytes → quarantine, do not overwrite.
  const byKey = await pool.query<{ id: string; sha256: string }>(
    `SELECT id, sha256 FROM source_documents
     WHERE tenant_id = $1 AND company_id = $2 AND access_key = $3`,
    [args.tenantId, args.companyId, parsed.accessKey],
  );
  if (byKey.rows[0] && byKey.rows[0].sha256 !== stored.sha256) {
    const { rows: qRows } = await pool.query<{ id: string }>(
      `INSERT INTO source_documents
         (tenant_id, company_id, batch_id, direction, access_key, sha256, byte_size,
          original_filename, storage_path, status, rejection_reason, created_by)
       VALUES ($1,$2,$3,'entry',$4,$5,$6,$7,$8,'variant_quarantine',$9,$10)
       RETURNING id`,
      [
        args.tenantId,
        args.companyId,
        args.batchId,
        parsed.accessKey,
        stored.sha256,
        args.bytes.length,
        args.filename,
        stored.storagePath,
        "Mesma chave com bytes diferentes — original preservado; variante em quarentena.",
        args.actorUserId,
      ],
    );
    await pool.query(
      `INSERT INTO import_errors (tenant_id, batch_id, filename, code, message, detail)
       VALUES ($1,$2,$3,'VARIANT_BYTES',$4,$5::jsonb)`,
      [
        args.tenantId,
        args.batchId,
        args.filename,
        "Mesma chave de acesso com conteúdo diferente. Original não sobrescrito.",
        JSON.stringify({ accessKey: parsed.accessKey, existingSha: byKey.rows[0].sha256 }),
      ],
    );
    return {
      filename: args.filename,
      status: "variant_quarantine",
      accessKey: parsed.accessKey,
      sourceDocumentId: qRows[0]!.id,
      message: "Variante em quarentena — original intacto.",
      warnings: parsed.warnings,
    };
  }

  // Existing parsed invoice same key (reimport) — return without new quota.
  const existingInv = await pool.query<{
    id: string;
    source_document_id: string;
  }>(
    `SELECT id, source_document_id FROM invoice_headers
     WHERE tenant_id = $1 AND company_id = $2 AND access_key = $3`,
    [args.tenantId, args.companyId, parsed.accessKey],
  );
  if (existingInv.rows[0]) {
    return {
      filename: args.filename,
      status: "duplicate",
      accessKey: parsed.accessKey,
      sourceDocumentId: existingInv.rows[0].source_document_id,
      invoiceId: existingInv.rows[0].id,
      message: "NF-e já cadastrada — sem novo consumo de cota.",
      created: false,
      warnings: parsed.warnings,
    };
  }

  // Reserve quota then persist; release on failure.
  let quota;
  try {
    quota = await reserveEntryInvoiceQuota({
      tenantId: args.tenantId,
      companyId: args.companyId,
      accessKey: parsed.accessKey,
      actorUserId: args.actorUserId,
    });
  } catch (error) {
    if (error instanceof QuotaError) {
      await pool.query(
        `INSERT INTO import_errors (tenant_id, batch_id, filename, code, message, detail)
         VALUES ($1,$2,$3,$4,$5,$6::jsonb)`,
        [
          args.tenantId,
          args.batchId,
          args.filename,
          error.code,
          error.message,
          JSON.stringify({ accessKey: parsed.accessKey }),
        ],
      );
      return {
        filename: args.filename,
        status: "rejected",
        accessKey: parsed.accessKey,
        message: error.message,
      };
    }
    throw error;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows: docRows } = await client.query<{ id: string }>(
      `INSERT INTO source_documents
         (tenant_id, company_id, batch_id, direction, access_key, sha256, byte_size,
          original_filename, storage_path, status, created_by)
       VALUES ($1,$2,$3,'entry',$4,$5,$6,$7,$8,'parsed',$9)
       RETURNING id`,
      [
        args.tenantId,
        args.companyId,
        args.batchId,
        parsed.accessKey,
        stored.sha256,
        args.bytes.length,
        args.filename,
        stored.storagePath,
        args.actorUserId,
      ],
    );
    const sourceDocumentId = docRows[0]!.id;

    const { rows: invRows } = await client.query<{ id: string }>(
      `INSERT INTO invoice_headers
         (tenant_id, company_id, source_document_id, access_key, model, series, number,
          issued_at, nature, tp_nf, id_dest, fin_nfe, emit_cnpj, emit_name, emit_uf,
          dest_cnpj, dest_name, dest_uf, protocol_number, authorization_status, triage, raw_summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8::timestamptz,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22::jsonb)
       RETURNING id`,
      [
        args.tenantId,
        args.companyId,
        sourceDocumentId,
        parsed.accessKey,
        parsed.model,
        parsed.series,
        parsed.number,
        parsed.issuedAt,
        parsed.nature,
        parsed.tpNf,
        parsed.idDest,
        parsed.finNfe,
        parsed.emitCnpj,
        parsed.emitName,
        parsed.emitUf,
        parsed.destCnpj,
        parsed.destName,
        parsed.destUf,
        parsed.protocolNumber,
        parsed.authorizationStatus,
        parsed.triage,
        JSON.stringify({ warnings: parsed.warnings }),
      ],
    );
    const invoiceId = invRows[0]!.id;

    for (const item of parsed.items) {
      await client.query(
        `INSERT INTO invoice_items
           (tenant_id, company_id, invoice_id, item_number, product_code, description,
            ncm, cest, gtin, cfop_issuer, quantity, unit_price, product_value,
            discount_value, freight_value, other_value, icms_cst_csosn, icms_origin,
            icms_base, icms_rate, icms_value, raw_fields)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22::jsonb)`,
        [
          args.tenantId,
          args.companyId,
          invoiceId,
          item.itemNumber,
          item.productCode,
          item.description,
          item.ncm,
          item.cest,
          item.gtin,
          item.cfopIssuer,
          item.quantity,
          item.unitPrice,
          item.productValue,
          item.discountValue,
          item.freightValue,
          item.otherValue,
          item.icmsCstCsosn,
          item.icmsOrigin,
          item.icmsBase,
          item.icmsRate,
          item.icmsValue,
          JSON.stringify(item.rawFields),
        ],
      );
    }

    if (quota.created) {
      await commitQuota(client, {
        tenantId: args.tenantId,
        companyId: args.companyId,
        accessKey: parsed.accessKey,
      });
    }

    await audit(client, {
      tenantId: args.tenantId,
      actorUserId: args.actorUserId,
      action: "import.entry_parsed",
      entityType: "invoice_header",
      entityId: invoiceId,
      detail: { accessKey: parsed.accessKey, sha256: stored.sha256 },
    });

    await client.query("COMMIT");
    return {
      filename: args.filename,
      status: "parsed",
      accessKey: parsed.accessKey,
      sourceDocumentId,
      invoiceId,
      created: quota.created,
      warnings: parsed.warnings,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    if (quota.created) {
      const c2 = await pool.connect();
      try {
        await releaseQuota(c2, {
          tenantId: args.tenantId,
          companyId: args.companyId,
          accessKey: parsed.accessKey,
        });
      } finally {
        c2.release();
      }
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function importEntryFiles(args: {
  tenantId: string;
  companyId: string;
  actorUserId: string;
  originalFilename: string;
  contentType: string;
  bytes: Buffer;
}): Promise<{ batchId: string; results: ImportFileResult[]; status: string }> {
  const pool = getPool();
  const company = await pool.query<{ id: string; cnpj: string }>(
    `SELECT id, cnpj FROM companies WHERE id = $1 AND tenant_id = $2`,
    [args.companyId, args.tenantId],
  );
  if (!company.rows[0]) {
    throw new ImportError("COMPANY_NOT_FOUND", "Empresa não encontrada.", 404);
  }
  const cnpjCheck = validateCnpj(company.rows[0].cnpj);
  if (!cnpjCheck.ok) {
    throw new ImportError("INVALID_COMPANY_CNPJ", cnpjCheck.error);
  }

  const { rows: batchRows } = await pool.query<{ id: string }>(
    `INSERT INTO import_batches
       (tenant_id, company_id, direction, status, original_filename, content_type, created_by)
     VALUES ($1,$2,'entry','processing',$3,$4,$5)
     RETURNING id`,
    [
      args.tenantId,
      args.companyId,
      args.originalFilename,
      args.contentType,
      args.actorUserId,
    ],
  );
  const batchId = batchRows[0]!.id;

  let files: { filename: string; bytes: Buffer }[] = [];
  const lower = args.originalFilename.toLowerCase();
  const isZip =
    lower.endsWith(".zip") ||
    args.contentType.includes("zip") ||
    args.bytes.subarray(0, 2).toString() === "PK";

  try {
    if (isZip) {
      files = await extractXmlsFromZip(args.bytes);
    } else {
      files = [{ filename: args.originalFilename, bytes: args.bytes }];
    }
  } catch (error) {
    const message =
      error instanceof ZipSecurityError ? error.message : "Falha ao ler arquivo.";
    const code = error instanceof ZipSecurityError ? error.code : "READ_ERROR";
    await pool.query(
      `INSERT INTO import_errors (tenant_id, batch_id, filename, code, message)
       VALUES ($1,$2,$3,$4,$5)`,
      [args.tenantId, batchId, args.originalFilename, code, message],
    );
    await pool.query(
      `UPDATE import_batches SET status = 'failed', finished_at = NOW() WHERE id = $1`,
      [batchId],
    );
    throw new ImportError(code, message);
  }

  const results: ImportFileResult[] = [];
  for (const file of files) {
    const result = await processOneXml({
      tenantId: args.tenantId,
      companyId: args.companyId,
      companyCnpj: company.rows[0].cnpj,
      actorUserId: args.actorUserId,
      batchId,
      filename: file.filename,
      bytes: file.bytes,
    });
    results.push(result);
  }

  const hasParsed = results.some((r) => r.status === "parsed");
  const hasErrors = results.some((r) =>
    ["rejected", "variant_quarantine"].includes(r.status),
  );
  const status = hasParsed
    ? hasErrors
      ? "completed_with_errors"
      : "completed"
    : hasErrors
      ? "completed_with_errors"
      : "failed";

  await pool.query(
    `UPDATE import_batches SET status = $2, finished_at = NOW() WHERE id = $1`,
    [batchId, status],
  );

  return { batchId, results, status };
}
