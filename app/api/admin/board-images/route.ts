import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getCloudflareBindings } from '@/lib/cloudflare-bindings';

const BOARD_IMAGE_DIR = path.join(process.cwd(), 'public', 'img', 'board');
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
}

function isAllowedImage(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

async function ensureBoardImageDir(): Promise<void> {
  await fs.mkdir(BOARD_IMAGE_DIR, { recursive: true });
}

function resolvePublicImageUrl(fileName: string, baseUrl?: string): string {
  if (!baseUrl) {
    return `/img/board/${fileName}`;
  }
  return `${baseUrl.replace(/\/$/, '')}/${fileName}`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const bindings = await getCloudflareBindings();
  const bucket = bindings?.BOARD_IMAGES;

  let files: string[] = [];
  if (bucket) {
    const listed = await bucket.list({ prefix: 'board/' });
    files = listed.objects
      .map((object) => object.key)
      .filter((key) => key.startsWith('board/'))
      .map((key) => key.slice('board/'.length))
      .filter((name) => isAllowedImage(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => resolvePublicImageUrl(name, bindings?.PUBLIC_R2_BASE_URL));
  } else {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'BOARD_IMAGES binding is missing. Enable R2 and add BOARD_IMAGES binding in wrangler.' },
        { status: 500 }
      );
    }

    await ensureBoardImageDir();
    const entries = await fs.readdir(BOARD_IMAGE_DIR, { withFileTypes: true });
    files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => isAllowedImage(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/img/board/${name}`);
  }

  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  const sanitizedName = sanitizeFileName(file.name);
  if (!isAllowedImage(sanitizedName)) {
    return NextResponse.json(
      { error: 'Unsupported file type. Use jpg, jpeg, png, webp, or gif.' },
      { status: 400 }
    );
  }

  await ensureBoardImageDir();
  const destination = path.join(BOARD_IMAGE_DIR, sanitizedName);
  const bytes = await file.arrayBuffer();
  const bindings = await getCloudflareBindings();
  const bucket = bindings?.BOARD_IMAGES;
  if (bucket) {
    await bucket.put(`board/${sanitizedName}`, bytes, {
      httpMetadata: {
        contentType: file.type || undefined,
      },
    });
    return NextResponse.json({ path: resolvePublicImageUrl(sanitizedName, bindings?.PUBLIC_R2_BASE_URL) });
  }

  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'BOARD_IMAGES binding is missing. Enable R2 and add BOARD_IMAGES binding in wrangler.' },
      { status: 500 }
    );
  }

  await fs.writeFile(destination, Buffer.from(bytes));
  return NextResponse.json({ path: `/img/board/${sanitizedName}` });
}
