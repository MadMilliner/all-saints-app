import { createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'all_saints_admin_session';
const DEFAULT_COOKIE_SECRET = 'change-me-in-production';

function digest(value: string): Buffer {
  return createHash('sha256').update(value).digest();
}

function getExpectedSessionDigest(): Buffer {
  const password = process.env.ADMIN_PANEL_PASSWORD ?? '';
  const cookieSecret = process.env.ADMIN_PANEL_COOKIE_SECRET ?? DEFAULT_COOKIE_SECRET;
  return createHash('sha256').update(`${password}:${cookieSecret}`).digest();
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PANEL_PASSWORD);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }

  const tokenDigest = Buffer.from(token, 'hex');
  const expectedDigest = getExpectedSessionDigest();

  if (tokenDigest.length !== expectedDigest.length) {
    return false;
  }

  return timingSafeEqual(tokenDigest, expectedDigest);
}

export async function setAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const password = process.env.ADMIN_PANEL_PASSWORD ?? '';
  const cookieSecret = process.env.ADMIN_PANEL_COOKIE_SECRET ?? DEFAULT_COOKIE_SECRET;
  const sessionToken = createHash('sha256')
    .update(`${password}:${cookieSecret}`)
    .digest('hex');

  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}
