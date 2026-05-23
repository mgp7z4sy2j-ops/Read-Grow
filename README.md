# STARTRADER Reading Growth Program

Employee book benefit platform with AI recommendations, Google Books price validation, and HR admin dashboard.

## Stack

- **Frontend:** Static HTML/CSS/JS
- **API:** Express (local) / Vercel Serverless (production)
- **Database:** [Neon](https://neon.tech) PostgreSQL via Prisma
- **AI:** Anthropic Claude (optional local fallback)

## Quick start (local)

```bash
cp .env.example .env
# Edit .env — add DATABASE_URL, ANTHROPIC_API_KEY, GOOGLE_BOOKS_API_KEY

npm install
npm run db:setup    # prisma db push + seed 100 books
npm run dev         # http://localhost:3000
```

Without `DATABASE_URL`, the app falls back to `data/books.json` and `data/orders.json` for local demos.

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Employee | `kevin.wang@startrader.com` | any 6+ chars |
| Admin | `jessica.liu@startrader.com` | any 6+ chars |

Domain must be `@startrader.com` or `@starprime.com`.

## Deploy to Vercel + Neon

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Good Book Program"
git remote add origin https://github.com/YOUR_ORG/good-book-program.git
git push -u origin main
```

### 2. Create Neon database

1. [console.neon.tech](https://console.neon.tech) → New project
2. Copy the **pooled** connection string (`?sslmode=require`)

### 3. Import to Vercel

1. [vercel.com/new](https://vercel.com/new) → Import GitHub repo
2. **Storage** → Add Integration → **Neon** (or paste `DATABASE_URL` manually)
3. Add environment variables:

| Variable | Required |
|----------|----------|
| `DATABASE_URL` | Yes (from Neon) |
| `ANTHROPIC_API_KEY` | Recommended |
| `GOOGLE_BOOKS_API_KEY` | Optional |

4. Deploy — Vercel runs `prisma generate && prisma db push` on build

### 4. Seed production books

After first deploy, run locally against production DB:

```bash
DATABASE_URL="your-neon-url" npm run db:seed
```

Or use Neon SQL editor / Vercel CLI:

```bash
vercel env pull .env.local
npm run db:seed
```

## API routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/books` | Book catalogue (admin) |
| POST | `/api/books` | Add book |
| GET | `/api/books/lookup?isbn=` | Google Books lookup |
| POST | `/api/books/check-budget` | Price validation |
| POST | `/api/recommendations` | AI book picks |
| POST | `/api/orders/submit` | Employee submit to HR |
| GET | `/api/orders` | Admin order queue |
| PATCH | `/api/orders/:id` | Update order status |

## E2E tests

```bash
npm run dev          # in one terminal
npm run test:e2e:headed
```

## Project structure

```
api/           Vercel serverless handlers
lib/           Shared business logic (catalog, orders, AI)
prisma/        Schema + seed script
server/        Local Express dev server
data/          JSON fallback + seed source
tests/         Playwright E2E
```
