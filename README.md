# Vaultly 🔐

**Your money, safely kept and smartly explained.**

Vaultly is a wallet app with a double-entry ledger at its core and an AI assistant that explains your money in plain language (English, Hindi or Hinglish). It is built to show how real fintech systems stay correct when things go wrong: double taps, retries, network drops and many requests at once.

> Status: 🚧 in progress. Step 1 (backend skeleton, health check, CI) is done. See the roadmap below.

## What it will do

| Area | Features |
|---|---|
| 💳 Wallet | Add money (Razorpay test mode), send to a friend, pay, refund, statement |
| 📒 Ledger | Double-entry bookkeeping: every rupee leaves one account and enters another, so the books always balance |
| 🛡️ Safety | Idempotency keys (a payment tapped twice is charged once), row-level locking (100 parallel spends never overdraw), amounts stored as integer paise |
| 🤖 AI assistant | Answers "how much did I spend on food?" from real ledger data, drafts payments behind PIN confirmation, reads bank-statement photos and categorises spending, measured by an eval suite |
| 🔎 Reconciliation | Matches Razorpay, the ledger and bank statements, and flags mismatches |

## Tech stack

| Layer | Tech |
|---|---|
| Mobile app | React Native + TypeScript *(coming)* |
| Backend API | Node.js, Express, TypeScript, Zod |
| Database & auth | PostgreSQL on Supabase |
| AI | Claude API (Haiku 5.5 by default) *(coming)* |
| Payments | Razorpay (test mode) *(coming)* |
| Tests & CI | Jest, Supertest, GitHub Actions |
| Hosting | Render (API), Vercel (web dashboard), Supabase (DB) |

## Run the backend locally

```bash
cd backend
npm install
cp .env.example .env    # then fill in DATABASE_URL from your Supabase project
npm run dev             # http://localhost:4000/health
npm test
```

`GET /health` answers `200 {"status":"ok","database":"up"}` when the database is reachable, and `503` when it is not.

## Roadmap

- [x] **Step 1**: backend skeleton, config validation, `/health`, tests, CI
- [ ] **Step 2**: database schema (accounts, transactions, ledger entries, idempotency keys) and migrations
- [ ] **Step 3**: create wallet, add money, balance
- [ ] **Step 4**: spend with an insufficient-balance check
- [ ] **Step 5**: idempotency keys, with a test that a repeated request is charged once
- [ ] **Step 6**: row-level locking, with a test where 100 parallel spends never overdraw
- [ ] **Step 7**: refunds (full and partial) and the statement
- [ ] **Step 8**: deploy (Render + Supabase) and API docs
- [ ] **Then**: React Native app, AI assistant with evals, reconciliation dashboard

## Project layout

```
vaultly/
├─ backend/              Node + Express API
│  ├─ src/
│  │  ├─ app.ts          builds the Express app (no listening, easy to test)
│  │  ├─ server.ts       starts the server
│  │  ├─ config.ts       environment settings, validated with Zod
│  │  ├─ db.ts           Postgres connection pool
│  │  └─ routes/         one file per route group
│  └─ tests/             Jest + Supertest
└─ .github/workflows/    CI: typecheck, test, build on every push
```

---

Built by [Lipika Chakraborty](https://www.linkedin.com/in/lipika-chakraborty-44a4bb3a2).
