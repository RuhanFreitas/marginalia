# Server tests

## Unit tests (`npm test`)

Co-located with source as `*.spec.ts`:

- `src/modules/**` — controllers and services
- `src/common/**` — utilities (markdown, comment tree)

Shared factories and mocks live in `test/helpers/`.

## E2E tests (`npm run test:e2e`)

HTTP tests under `test/e2e/` using Supertest against the full `AppModule`.

**Requirements**

1. PostgreSQL running and reachable
2. `.env` with `DATABASE_URL` and `JWT_SECRET` (see `.env.example`)

On startup, `test/setup/global-setup.ts` runs `prisma migrate deploy`. If the database is unavailable, e2e suites are skipped automatically.

## Layout

```
test/
  e2e/           # end-to-end HTTP tests
  helpers/       # shared mocks, factories, app bootstrap
  setup/         # Jest global setup (migrations)
  jest-e2e.json
```
