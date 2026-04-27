import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { isEditableFile, readJsonFile, writeJsonFile } from '@/lib/admin-data';
import { getCloudflareBindings, getKvKey } from '@/lib/cloudflare-bindings';

function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return unauthorizedResponse();
  }

  const file = request.nextUrl.searchParams.get('file') ?? '';
  if (!isEditableFile(file)) {
    return NextResponse.json({ error: 'Invalid file requested.' }, { status: 400 });
  }

  const bindings = await getCloudflareBindings();
  const kv = bindings?.CONTENT_KV;
  const key = getKvKey(file);

  let content = kv ? await kv.get(key) : null;
  if (!content) {
    content = await readJsonFile(file);
  }

  return NextResponse.json({ file, content });
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return unauthorizedResponse();
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const file = typeof body.file === 'string' ? body.file : '';
  const content = typeof body.content === 'string' ? body.content : '';

  if (!isEditableFile(file)) {
    return NextResponse.json({ error: 'Invalid file requested.' }, { status: 400 });
  }

  if (!content.trim()) {
    return NextResponse.json({ error: 'Content cannot be empty.' }, { status: 400 });
  }

  try {
    const parsed = JSON.parse(content);
    const formatted = `${JSON.stringify(parsed, null, 2)}\n`;

    const bindings = await getCloudflareBindings();
    const kv = bindings?.CONTENT_KV;
    const key = getKvKey(file);

    if (kv) {
      await kv.put(key, formatted);
    } else {
      await writeJsonFile(file, formatted);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof SyntaxError
        ? 'Invalid JSON. Please fix formatting before saving.'
        : 'Unable to save file.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
