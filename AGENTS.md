# Project Conventions

- Always use `pnpm` instead of `npm` for all package management commands (install, run, build, etc.)

## Project memory

- This repository is David Lopez's expenses tracker and is the active project for future work.
- It contains two independent packages: `client/` and `server/`; run package commands from the relevant package directory.
- Client stack: React 19, Vite 8, React Router 7, Axios, Tailwind CSS 4, Motion, and Font Awesome.
- Server stack: Express 5 (ES modules), PostgreSQL, Prisma 7 with the PostgreSQL adapter, JWT, bcrypt, Helmet, CORS, and rate limiting. The server currently listens on port 3000.
- Required runtime configuration: server `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_URL`; client `VITE_API_URL` (defaults to `http://localhost:3000`). No `.env.example` files currently exist.
- Authentication uses a one-hour JWT stored in browser `localStorage`; Axios sends it as a Bearer token and redirects to `/login` on HTTP 401.
- Core data model: users own accounts and categories; accounts own transactions. Account types are CASH, CHECKING, SAVINGS, and CREDIT. Transaction types are INCOME, EXPENSE, and TRANSFER. Categories are INCOME or EXPENSE.
- Current authenticated routes: `/dashboard`, `/transactions`, `/accounts`, and `/accounts/:id`. Public routes are `/`, `/login`, and `/register`.
- Implemented API features: register/login/current user, list/create accounts, list/create/delete transactions, and list/create categories. Registration seeds Food, Transportation, and Salary categories.
- Client state is split across Auth, Modal, Theme, Account, Transaction, and Category contexts. The Transactions screen computes totals from initial balances plus income minus expenses, supports search, modals, and transaction pagination.
- Current maturity: transactions and account/category creation are substantially wired; Dashboard and AccountSummary are incomplete, account search is visual only, and there are no automated tests or README.
- Important follow-up: transaction creation and deletion currently do not verify that the referenced transaction/account/category belongs to the authenticated user. Add ownership checks before production use. Also validate numeric amounts and permit a zero initial balance when creating an account.
- Design direction is documented in `client/DESIGN.md`: “Deep Indigo Finance,” modern minimalist, responsive, with indigo primary actions and emerald/rose financial semantics.
