# Vercel Deployment Guide

**Last Updated:** March 18, 2026

## Environment Variables Required

Add these to Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://yudtrrpevqvsewalafyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZHRycnBldnF2c2V3YWxhZnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NTgxNjcsImV4cCI6MjA4OTMzNDE2N30.-YurNCl_wvEIeIqIBXa6iLEzJolZ8AV0FKCfTFDAW9Y
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZHRycnBldnF2c2V3YWxhZnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc1ODE2NywiZXhwIjoyMDg5MzM0MTY3fQ.jtTH0DTCtdt9aqN8dUgqwIObO1-22raUAEfOjev6dKo
NEXT_PUBLIC_SITE_URL=https://jessacake.vercel.app
```

**Important:** Apply to Production, Preview, AND Development environments.

## Steps

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable above
3. Select all three environments (Production, Preview, Development)
4. Save
5. Go to Deployments → Redeploy latest deployment

## Supabase Configuration

Make sure your Supabase project has:
- Authentication enabled
- RLS policies configured (run `supabase/seed.sql`)
- Products seeded (run `supabase/seed-products.sql`)

## Vercel Domain in Supabase

Add your Vercel domain to Supabase:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add `https://jessacake.vercel.app` to Site URL
3. Add `https://jessacake.vercel.app/**` to Redirect URLs
