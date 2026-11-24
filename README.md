# Next.js SaaS starter

Next.js App Router starter with Clerk, Supabase, Prisma, Stripe, and Upstash. Application code talks to Supabase with the service role key. Prisma is set up for migrations only. Clerk is the authentication provider.

## Prerequisites

- Node.js 22.13 or newer
- npm
- A Supabase project
- A Clerk application, if `config.auth.enabled` is true
- A Stripe account, if `config.payments.enabled` is true
- An Upstash Redis database, if you wire up `lib/ratelimiter.ts`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill it in:

   ```bash
   cp .env.template .env
   ```

   | Variable | Used for |
   | --- | --- |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client |
   | `CLERK_SECRET_KEY` | Clerk server |
   | `CLERK_WEBHOOK_SECRET` | Svix verification for `POST /api/auth/webhook` |
   | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Clerk sign-in path (`/sign-in`) |
   | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Clerk sign-up path (`/sign-up`) |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in |
   | `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_SERVICE_KEY` | Supabase service role key. Server-only |
   | `DATABASE_URL` | Pooled Postgres URL. Fallback for Prisma Migrate when `DIRECT_URL` is unset |
   | `DIRECT_URL` | Session or direct Postgres URL. Prisma Migrate uses this |
   | `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
   | `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
   | `FRONTEND_URL` | Origin used in Stripe Checkout success and cancel URLs |
   | `STRIPE_SECRET_KEY` | Stripe server SDK |
   | `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature |
   | `NEXT_PUBLIC_STRIPE_PRICE_ID` | Price id used by the sample pricing cards |

3. Turn features on or off in `config.ts`:

   ```ts
   const config = {
     auth: {
       enabled: true,
     },
     payments: {
       enabled: true,
     },
   };
   ```

4. Apply the Prisma schema. Prisma 7 reads the migration URL from `prisma.config.ts` (`DIRECT_URL`, then `DATABASE_URL`). The schema file no longer contains `url` or `directUrl`.

   ```bash
   npx prisma migrate dev
   ```

   Runtime queries in this repo use the Supabase client, not `PrismaClient`. Creating a Prisma 7 client requires a driver adapter such as `@prisma/adapter-pg`. That adapter is not installed.

5. Start the app:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

## Scripts

- `npm run dev` starts the Next.js dev server
- `npm run build` creates a production build
- `npm start` serves the production build
- `npm run lint` runs ESLint. `npm install` may warn that ESLint 10 sits outside the peer range of plugins bundled by `eslint-config-next`. Next.js 16.4 supports ESLint 10, and `npm run lint` passes.

## Webhooks

- Clerk user sync: `POST /api/auth/webhook`
- Stripe payments: `POST /api/payments/webhook`

## Security

- Keep `SUPABASE_SERVICE_KEY` and `STRIPE_SECRET_KEY` on the server. The service role key bypasses Row Level Security.
- Enable RLS on the Supabase tables. The current server helpers still send the service role key, so RLS does not protect those calls.
