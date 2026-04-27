## All Saints LA Web App

Public website and lightweight content admin for All Saints LA, built with Next.js and deployed to Cloudflare with OpenNext.

### Project Overview

- Frontend site pages are in `app/(pages)`.
- Editable content in Cloudflare deploys is stored in KV:
  - KV key `board`
  - KV key `jobs`
- Local development still falls back to JSON files:
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

### Cloudflare Content Storage Setup

The admin backend is configured to use:

- `CONTENT_KV` for `board` and `jobs` JSON content
- `BOARD_IMAGES` (R2 bucket) for board image uploads

Create and seed KV:

```bash
npx wrangler kv namespace create CONTENT_KV --binding CONTENT_KV --update-config
npx wrangler kv key put board --binding CONTENT_KV --path "./data/board.json" --remote
npx wrangler kv key put jobs --binding CONTENT_KV --path "./data/jobs.json" --remote
```

Create R2 bucket for board image uploads:

```bash
npx wrangler r2 bucket create all-saints-board-images --binding BOARD_IMAGES --update-config
```

If bucket creation fails with Cloudflare API error `10042`, enable R2 in your Cloudflare account first, then re-run the command.

Optional: add a public base URL in `wrangler.jsonc` vars for R2-hosted images:

```json
{
  "vars": {
    "PUBLIC_R2_BASE_URL": "https://<your-r2-public-domain>/board"
  }
}
```

Then regenerate Worker env types:

```bash
npm run cf-typegen
```

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
