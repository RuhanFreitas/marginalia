# Frontend tests

## Commands

- `npm test` — run all tests once
- `npm run test:watch` — watch mode
- `npm run test:cov` — coverage report

## Layout

```
test/
  setup.ts       # global mocks (next/image, next/navigation)
  helpers/       # render wrappers, factories

**/*.spec.ts(x)  # co-located with source
```

## What we test

| Layer | Examples |
|-------|----------|
| **lib** | validation, API client, markdown editor, theme |
| **API modules** | auth, marginalia, comments, user (`fetch` mocked) |
| **providers / hooks** | AuthProvider, SearchProvider, `useCreateMarginalia` |
| **components** | FormError, Marginalia Card |
