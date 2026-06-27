import "server-only";
import { prisma } from "@/lib/prisma";

export interface UploadFile {
  key: string;
  uploadedAtMs: number;
}

export interface CleanupResult {
  scanned: number;
  deleted: number;
  skipped?: string;
}

/**
 * Pure selectie: een bestand is "orphan" als het ouder is dan de cutoff én
 * geen enkele gekoppelde URL de bestandssleutel bevat. Zo blijven aan een lead
 * gekoppelde foto's gegarandeerd staan.
 */
export function selectOrphans(files: UploadFile[], linkedUrls: string[], cutoffMs: number): UploadFile[] {
  return files.filter((f) => f.uploadedAtMs < cutoffMs && !linkedUrls.some((u) => u.includes(f.key)));
}

/** Alle URL's die wél aan iets gekoppeld zijn (lead-bijlagen + analyse-afbeeldingen). */
export async function linkedImageUrls(): Promise<string[]> {
  const [attachments, images] = await Promise.all([
    prisma.leadAttachment.findMany({ select: { url: true } }),
    prisma.photoAnalysisImage.findMany({ select: { imageUrl: true } }),
  ]);
  return [...attachments.map((a) => a.url), ...images.map((i) => i.imageUrl)];
}

/**
 * Verwijdert verweesde uploads (ouder dan X uur, niet aan een lead gekoppeld).
 * `list`/`remove` zijn injecteerbaar (default: UploadThing UTApi). Zonder
 * UploadThing-token wordt veilig overgeslagen. Logt het aantal verwijderd.
 */
export async function cleanupOrphanUploads(opts?: {
  olderThanHours?: number;
  now?: Date;
  list?: () => Promise<UploadFile[]>;
  remove?: (keys: string[]) => Promise<void>;
}): Promise<CleanupResult> {
  const now = opts?.now ?? new Date();
  const cutoffMs = now.getTime() - (opts?.olderThanHours ?? 24) * 60 * 60 * 1000;

  let list = opts?.list;
  let remove = opts?.remove;
  if (!list || !remove) {
    if (!process.env.UPLOADTHING_TOKEN) return { scanned: 0, deleted: 0, skipped: "no_uploadthing_token" };
    const { UTApi } = await import("uploadthing/server");
    const api = new UTApi();
    list =
      list ??
      (async () => {
        const res = await api.listFiles({ limit: 500 });
        return res.files.map((f) => ({ key: f.key, uploadedAtMs: f.uploadedAt ?? 0 }));
      });
    remove = remove ?? (async (keys: string[]) => { await api.deleteFiles(keys); });
  }

  const files = await list();
  const linked = await linkedImageUrls();
  const orphans = selectOrphans(files, linked, cutoffMs);
  if (orphans.length > 0) await remove(orphans.map((o) => o.key));
  return { scanned: files.length, deleted: orphans.length };
}
