import { NextRequest, NextResponse } from 'next/server';
import { isAdminConfigured, setAdminSessionCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: 'Admin password is not configured. Set ADMIN_PANEL_PASSWORD.' },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const password = typeof body.password === 'string' ? body.password : '';
  const expectedPassword = process.env.ADMIN_PANEL_PASSWORD ?? '';

  if (!password || password !== expectedPassword) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  await setAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
