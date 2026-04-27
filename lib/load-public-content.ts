import { readJsonFile, type EditableDataFile } from '@/lib/admin-data';
import { getCloudflareBindings, getKvKey } from '@/lib/cloudflare-bindings';

/**
 * Raw JSON string for `board` or `jobs`, preferring Cloudflare KV when bound
 * (same keys as admin: `board`, `jobs`), otherwise `data/*.json`.
 */
export async function loadPublicContentJson(file: EditableDataFile): Promise<string> {
  const bindings = await getCloudflareBindings();
  const kv = bindings?.CONTENT_KV;
  const key = getKvKey(file);

  let content: string | null = kv ? await kv.get(key) : null;
  if (!content) {
    content = await readJsonFile(file);
  }
  return content;
}
