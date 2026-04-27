import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';

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

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  await ensureBoardImageDir();
  const entries = await fs.readdir(BOARD_IMAGE_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => isAllowedImage(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `/img/board/${name}`);

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
  await fs.writeFile(destination, Buffer.from(bytes));

  return NextResponse.json({ path: `/img/board/${sanitizedName}` });
}
