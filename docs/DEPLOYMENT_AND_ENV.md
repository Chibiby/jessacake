# Deployment & Environment — Jessa Cakes Delights

---

## Architecture Overview

```
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│   Browser   │──────▶│   Vercel    │──────▶│    Supabase     │
│  (Client)   │◀──────│  (Next.js)  │◀──────│ (DB + Auth +    │
│             │       │             │       │  Storage)        │
└─────────────┘       └─────────────┘       └─────────────────┘
```

- **Vercel** hosts the Next.js application (frontend + serverless API)
- **Supabase** provides PostgreSQL database, authentication, and file storage
- **GitHub** is the source of truth; Vercel deploys on push to `main`

---

## GitHub Workflow

### Branch Strategy (Simple)

| Branch    | Purpose                                  |
| --------- | ---------------------------------------- |
| `main`    | Production branch — auto-deploys to Vercel |
| `dev`     | Development branch — for active work     |
| `feature/*` | Feature branches — branched from `dev` |

### Recommended Workflow

1. Work on `dev` or `feature/*` branches
2. Test locally
3. Merge feature branches into `dev`
4. When ready to deploy, merge `dev` into `main`
5. Vercel auto-deploys from `main`

### Commit Convention (Recommended)

```
feat: add product catalog page
fix: correct delivery fee calculation
style: update button hover colors
refactor: extract order validation logic
docs: update README with setup instructions
chore: update dependencies
```

### .gitignore Essentials

```
# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment
.env
.env.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel/
```

---

## Vercel Deployment

### Initial Setup

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import the `jessa-cakes-delights` GitHub repository
4. Vercel auto-detects Next.js — no build config changes needed
5. Add environment variables (see below)
6. Click **"Deploy"**

### Build Settings (Auto-Detected)

| Setting         | Value             |
| --------------- | ----------------- |
| Framework       | Next.js           |
| Build Command   | `next build`      |
| Output Directory| `.next`           |
| Install Command | `npm install`     |
| Node Version    | 18.x or 20.x     |

### Auto-Deploy

- Every push to `main` triggers a production deployment
- Pull requests get preview deployments automatically
- Preview URLs are generated for each PR

### Custom Domain (When Ready)

1. Go to project settings → Domains
2. Add custom domain (e.g., `jessacakesdelights.com`)
3. Follow DNS configuration instructions
4. SSL is automatic via Vercel

---

## Supabase Connection

### Setup Steps

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Note the **Project URL** and **API keys** from Settings → API
3. Run database migrations (SQL from `DATABASE_PLAN.md`)
4. Create the `product-images` storage bucket
5. Configure RLS policies
6. Create the admin user via Supabase Auth dashboard

### Supabase Client Setup

Install packages:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

Create client utilities:

**Browser Client** (`src/lib/supabase/client.ts`):
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Client** (`src/lib/supabase/server.ts`):
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

---

## Environment Variables

### Required Variables

| Variable                          | Where Used    | Description                        |
| --------------------------------- | ------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Client + Server | Supabase project URL             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Client + Server | Supabase anonymous/public key    |
| `SUPABASE_SERVICE_ROLE_KEY`       | Server only   | Supabase service role key (admin)  |
| `NEXT_PUBLIC_SITE_URL`            | Client        | Production site URL                |

### Example `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Example `.env.example` (Committed to Git)

```env
# Supabase — get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Site URL — set to your production domain
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Setting Variables on Vercel

1. Go to Vercel project → Settings → Environment Variables
2. Add each variable with its production value
3. Set scope to "Production" (and "Preview" if needed)
4. Redeploy after adding/changing variables

> **CRITICAL:** Never commit `.env.local` to Git. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.

---

## Security Reminders

### Environment Variables
- `.env.local` is in `.gitignore` — never committed
- `NEXT_PUBLIC_*` variables are exposed to the browser — only put safe values here
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — use only in server-side code

### Supabase
- Enable RLS on all tables
- Test RLS policies: public users should only read visible products and insert orders
- Admin users authenticate through Supabase Auth — not custom auth
- Storage bucket `product-images` should be public for read access

### Next.js
- Middleware protects `/admin/*` routes
- Server actions validate auth before mutations
- All user inputs validated with Zod server-side
- Use `next/image` for image optimization (prevents hotlinking abuse)

### General
- Keep dependencies updated (`npm audit`)
- Don't store sensitive data in client-side state
- Use HTTPS in production (Vercel provides this automatically)

---

## Production Readiness Checklist

### Before Launch

- [ ] All environment variables set on Vercel
- [ ] Supabase RLS policies tested and active
- [ ] Admin user created in production Supabase Auth
- [ ] Storage bucket configured with correct policies
- [ ] Initial categories and products seeded
- [ ] Site settings configured (business info, delivery fee)
- [ ] All forms validated and tested
- [ ] Error states handled gracefully
- [ ] 404 page exists and looks proper
- [ ] Mobile responsiveness verified
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Lighthouse score ≥ 85 (mobile)
- [ ] SEO meta tags present on all public pages
- [ ] Open Graph tags configured for social sharing
- [ ] Console free of errors and warnings
- [ ] `.env.local` is NOT in the repository
- [ ] No hardcoded secrets in the codebase
- [ ] favicon and site icons configured
- [ ] Production URL set in Supabase Auth redirect URLs
- [ ] Vercel auto-deploy from `main` branch working

### Post-Launch Monitoring

- [ ] Check Vercel deployment logs for errors
- [ ] Monitor Supabase dashboard for usage limits
- [ ] Test order flow on production
- [ ] Verify admin login on production
- [ ] Check image loading performance
- [ ] Monitor Supabase Storage usage (1 GB free tier)
- [ ] Monitor Supabase database row count (500 MB free tier)
