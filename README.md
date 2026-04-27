## All Saints LA Web App

Public website and lightweight content admin for All Saints LA, built with Next.js and deployed to Cloudflare with OpenNext.

### Project Overview

- Frontend site pages are in `app/(pages)`.
- Editable content is stored in local JSON files:
  - `data/board.json`
  - `data/jobs.json`
- Admin editor is available at `app/admin/page.tsx` (route: `/admin`).
- Admin API routes are in `app/api/admin`.

### Local Development

From `all-saints-app`:

```bash
npm install
npm run dev
```

### Admin Editor

Visit `/admin` and sign in with the password from environment variables.

Required env vars:

- `ADMIN_PANEL_PASSWORD`: password required to log in to `/admin`
- `ADMIN_PANEL_COOKIE_SECRET`: secret used to sign/validate admin session cookies

The admin UI supports:

- Switching between Board and Jobs content sets
- Switching records via dropdown
- Auto-generated record IDs (`idNum` for board, slug-based `id` for jobs)
- Non-editable ID fields
- `standing` dropdown (`active` / `inactive`)
- Add/remove records and edit nested fields

### Cloudflare Build and Deploy

From `all-saints-app`:

```bash
npm run deploy
```

This runs:

```bash
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Other useful Cloudflare scripts:

```bash
npm run preview
npm run upload
```
