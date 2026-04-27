import type { EditableDataFile } from '@/lib/admin-data';

type CloudflareEnvBindings = {
  CONTENT_KV?: KVNamespace;
  BOARD_IMAGES?: R2Bucket;
  PUBLIC_R2_BASE_URL?: string;
};

type CloudflareContext = {
  env?: CloudflareEnvBindings;
};

const KV_KEYS: Record<EditableDataFile, string> = {
  board: 'board',
  jobs: 'jobs',
};

export async function getCloudflareBindings(): Promise<CloudflareEnvBindings | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const context = getCloudflareContext() as CloudflareContext | undefined;
    return context?.env ?? null;
  } catch {
    return null;
  }
}

export function getKvKey(file: EditableDataFile): string {
  return KV_KEYS[file];
}

