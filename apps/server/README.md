# Marginalia API

REST API for **Marginalia**—a reading platform where users browse literary marginalia entries (book excerpts with rich text), read threaded comments, and manage their account. This service powers the Next.js frontend in `apps/client` and runs as the `server` workspace inside the monorepo root.

Default URL in development: `http://localhost:3001` (see [Configuration](#configuration)).

---

## Table of contents

- [Introduction](#introduction)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [API routes](#api-routes)
- [Authentication and authorization](#authentication-and-authorization)
- [Database entities](#database-entities)
- [Configuration](#configuration)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Error handling](#error-handling)

---

## Introduction

Marginalia lets visitors explore curated entries tied to books and authors. Each entry stores metadata (title, description, cover image URL) and English content that is submitted as Markdown-like text, converted to sanitized HTML, and persisted. Authenticated users can post nested comments on entries; administrators create and maintain marginalia content.

The API is built with NestJS, validates incoming payloads with `class-validator`, stores data in PostgreSQL through Prisma, and issues JWTs delivered both in JSON responses and `httpOnly` cookies for browser clients.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | [NestJS](https://nestjs.com/) 11 |
| Language | TypeScript |
| Database | PostgreSQL 18 (Docker via `compose.yml`) |
| ORM | [Prisma](https://www.prisma.io/) 7 (`@prisma/adapter-pg` + `pg`) |
| Auth | Passport JWT (`@nestjs/jwt`, `passport-jwt`) |
| Password hashing | bcrypt |
| Validation | `class-validator`, global `ValidationPipe` |
| HTTP | Express (`@nestjs/platform-express`) |
| Content | Custom Markdown-to-HTML pipeline + `sanitize-html` |
| Config | `@nestjs/config` (`.env`) |
| Tests | Jest (unit + e2e with Supertest) |

---

## Architecture

The application follows a **modular, layered** design: each feature lives in a NestJS module with **Controller → Service → Repository** separation. Repositories encapsulate Prisma access; services hold business rules (e.g. building comment trees, converting Markdown). Cross-cutting concerns live under `src/common/` (guards, filters, shared utilities).

```mermaid
flowchart TB
    Client[HTTP Client / Frontend]
    Main[main.ts]
    App[AppModule]
    AuthM[AuthModule]
    UserM[UserModule]
    MargM[MarginaliaModule]
    CommentM[CommentModule]
    PrismaM[PrismaModule]
    DB[(PostgreSQL)]

    Client --> Main
    Main --> App
    App --> AuthM & UserM & MargM & CommentM
    AuthM & UserM & MargM & CommentM --> PrismaM
    PrismaM --> DB
```

**Bootstrap (`main.ts`)**

- `cookie-parser` for JWT cookies
- Global `ValidationPipe` on all DTOs
- Global Prisma exception filters
- CORS enabled for `http://localhost:3000` with `credentials: true`

**Data access**

- `PrismaService` extends the generated `PrismaClient` and connects through `PrismaPg` using `DATABASE_URL`.
- Prisma Client is generated into `src/generated/prisma/` (do not edit by hand).

**Shared utilities**

- `buildCommentTree` — flattens DB comments into a nested `replies` tree for API responses.
- `markdownToHtml` + `sanitizeContentHtml` — transforms marginalia body text before save.

---

## Project structure

```
apps/server/
├── compose.yml              # PostgreSQL for local development
├── prisma.config.ts         # Prisma CLI config (schema path, migrations, datasource)
├── prisma/
│   ├── schema.prisma        # Data model
│   └── migrations/          # SQL migration history
├── src/
│   ├── main.ts              # Application entrypoint
│   ├── app.module.ts        # Root module
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── hash/                # Password hashing (bcrypt)
│   ├── common/
│   │   ├── comments/        # Comment tree builder
│   │   ├── database/        # Prisma error helpers & filters
│   │   ├── decorators/      # @Roles()
│   │   ├── filters/         # Global Prisma exception filters
│   │   ├── guards/          # RolesGuard
│   │   ├── markdown/        # Markdown → HTML + sanitization
│   │   └── types/           # JwtRequest, JwtUser, Comment types
│   ├── generated/prisma/    # Generated Prisma Client (gitignored output)
│   └── modules/
│       ├── auth/            # Login, register, logout, JWT strategy
│       ├── user/            # Profile CRUD for authenticated user
│       ├── marginalia/      # Literary entries
│       └── comment/         # Threaded comments
└── test/
    ├── e2e/                 # HTTP integration tests
    ├── helpers/             # App factory, DB reset, factories
    └── setup/               # Jest global setup (migrations)
```

### Modules

| Module | Responsibility |
| --- | --- |
| `AuthModule` | Register/login, JWT signing, `JwtStrategy`, cookie-based session |
| `UserModule` | Current-user profile (`GET` / `PATCH` / `DELETE` on `/user`) |
| `MarginaliaModule` | CRUD for entries; public read, admin write |
| `CommentModule` | List, create, update, delete comments |
| `PrismaModule` | Global `PrismaService` provider |
| `HashModule` | bcrypt wrapper used by auth |

---

## API routes

Base path: `/` (no global prefix). All successful handlers return JSON unless noted.

### Auth — `/auth`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Create account. Returns `{ token, user }` and sets `token` cookie. |
| `POST` | `/auth/login` | No | Authenticate. Returns `{ token, user }` and sets `token` cookie. |
| `POST` | `/auth/logout` | No | Clears `token` cookie (`maxAge: 0`). |

**Register / login body**

```json
{
  "name": "Jane Reader",
  "email": "jane@example.com",
  "password": "secret123"
}
```

Login omits `name` and only requires `email` and `password`.

**User in response** (`ResponseUserDTO`): `id`, `email`, `name`, `role` (password never exposed).

---

### User — `/user`

Requires JWT (`AuthGuard('jwt')`) and role `USER` or `ADMIN`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/user` | Current user profile |
| `PATCH` | `/user` | Update `name`, `email`, and/or `password` (all optional) |
| `DELETE` | `/user` | Delete current user account |

---

### Marginalia — `/marginalia`

| Method | Path | Auth | Role | Description |
| --- | --- | --- | --- | --- |
| `GET` | `/marginalia/all` | No | — | List all entries (newest `id` first), with comments included |
| `GET` | `/marginalia/:id` | No | — | Single entry; `comments` returned as a nested tree |
| `POST` | `/marginalia` | Yes | `ADMIN` | Create entry (Markdown `contentEn` stored as sanitized HTML) |
| `PATCH` | `/marginalia/:id` | Yes | `ADMIN` | Partial update |
| `DELETE` | `/marginalia/:id` | Yes | `ADMIN` | Delete entry |

**Create body** (`CreateMarginaliaDTO`)

| Field | Type | Description |
| --- | --- | --- |
| `book` | string | Book title |
| `title` | string | Entry title |
| `description` | string | Short summary |
| `cover` | string | Cover image URL |
| `author` | string | Author name |
| `contentEn` | string | Body (Markdown-like syntax converted server-side) |

`PATCH` accepts any subset of the same fields (`UpdateMarginaliaDTO`).

---

### Comments — `/comment`

| Method | Path | Auth | Role | Description |
| --- | --- | --- | --- | --- |
| `GET` | `/comment/:id/comments` | No | — | `:id` = marginalia id; returns nested comment tree |
| `POST` | `/comment` | Yes | `USER`, `ADMIN` | Create comment |
| `PATCH` | `/comment/:id` | Yes | `USER`, `ADMIN` | Update own comment (`:id` = comment id) |
| `DELETE` | `/comment/:id` | Yes | `USER`, `ADMIN` | Delete own comment |

**Create body** (`CreateCommentDTO`)

```json
{
  "content": "Great passage.",
  "marginaliaId": 1,
  "parentId": 5
}
```

`parentId` is optional; when set, the comment is attached as a reply. Updates only accept `{ "content": "..." }`. Modify/delete operations are scoped to the authenticated author (`where: { id, userId }`).

---

## Authentication and authorization

**JWT**

- Signed with `JWT_SECRET`; default expiry **7 days** (`JwtModule` `signOptions`).
- Payload: `{ sub: userId, role: userRole }`.
- Extracted from:
  1. `Authorization: Bearer <token>`
  2. `token` cookie (set on login/register)

**Cookies** (login / register)

- Name: `token`
- Flags: `httpOnly`, `secure`, `sameSite: 'strict'`
- `maxAge`: 30 hours

**Roles** (`Role` enum)

| Role | Capabilities |
| --- | --- |
| `USER` | Profile management; create/update/delete own comments |
| `ADMIN` | All `USER` abilities plus create/update/delete marginalia |

`RolesGuard` + `@Roles()` decorator enforce role checks on protected routes.

---

## Database entities

Defined in `prisma/schema.prisma`. PostgreSQL provider; client output: `src/generated/prisma`.

### `User`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key, autoincrement |
| `email` | `String` | Unique |
| `name` | `String` | |
| `password` | `String` | bcrypt hash |
| `role` | `Role` | Default `USER` |
| `createdAt` / `updatedAt` | `DateTime` | |
| Relations | `comments`, `marginalias` | |

### `Marginalia`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key |
| `userId` | `Int` | Author (admin user) |
| `title` | `String` | Default `""` |
| `description` | `String` | Default `""` |
| `cover` | `String` | Image URL |
| `book` | `String` | |
| `author` | `String` | |
| `contentEn` | `String` | Sanitized HTML |
| `createdAt` / `updatedAt` | `DateTime` | |
| Relations | `user`, `comments` | |

### `Comment`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key |
| `content` | `String` | |
| `parentId` | `Int?` | Self-relation for replies |
| `userId` | `Int` | Author |
| `marginaliaId` | `Int` | Parent entry |
| `createdAt` / `updatedAt` | `DateTime` | |
| Relations | `parent`, `replies`, `user`, `marginalia` | Cascade delete on parent comment, user, and marginalia |

### `Role` (enum)

- `USER`
- `ADMIN`

### Entity relationship diagram

```mermaid
erDiagram
    User ||--o{ Marginalia : authors
    User ||--o{ Comment : writes
    Marginalia ||--o{ Comment : has
    Comment ||--o{ Comment : replies
```

---

## Configuration

### Environment variables

Copy `.env.example` to `.env` in `apps/server/`:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | HTTP port (default **3001** in code if unset) |
| `DATABASE_URL` | Yes | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Yes | Secret for signing and verifying JWTs |
| `DB_USER` | For Docker | Postgres user (`compose.yml`) |
| `DB_PASSWORD` | For Docker | Postgres password |
| `DB_NAME` | For Docker | Database name |

Example `DATABASE_URL`:

```
postgresql://admin:marginalia_admin_password@localhost:5432/marginalia?schema=public
```

### Database (Docker)

From `apps/server/`:

```bash
docker compose up -d
```

This starts PostgreSQL 18 on port `5432` with credentials aligned to `.env.example`.

### Prisma

From `apps/server/`:

```bash
npx prisma migrate deploy   # apply migrations
npx prisma generate         # regenerate client after schema changes
```

Configuration file: `prisma.config.ts` (schema path, migrations folder, datasource URL from env).

### CORS

The API allows requests from `http://localhost:3000` with credentials so the Next.js frontend can send cookies. Adjust `main.ts` when deploying to other origins.

---

## Getting started

**Prerequisites:** Node.js, npm, Docker (for local Postgres).

1. Install dependencies from the monorepo root:

   ```bash
   npm install
   ```

2. Configure environment:

   ```bash
   cd apps/server
   cp .env.example .env
   # Edit .env as needed (PORT, DATABASE_URL, JWT_SECRET)
   ```

3. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

4. Run migrations and generate the client:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

5. Start the API:

   ```bash
   npm run start:dev
   ```

   Or from the repository root:

   ```bash
   npm run dev:server
   ```

The server listens on `http://localhost:${PORT}` (default **3001**).

---

## Scripts

Run from `apps/server/` unless noted.

| Command | Description |
| --- | --- |
| `npm run start` | Start once (no watch) |
| `npm run start:dev` | Start with file watch |
| `npm run start:debug` | Start with debugger and watch |
| `npm run start:prod` | Run compiled `dist/main.js` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | ESLint with auto-fix |
| `npm run test` | Unit tests (`src/**/*.spec.ts`) |
| `npm run test:e2e` | End-to-end HTTP tests |
| `npm run test:cov` | Unit tests with coverage |

Production build:

```bash
npm run build
npm run start:prod
```

---

## Testing

See [`test/README.md`](test/README.md) for layout and requirements.

**Unit tests** — `npm test`  
Co-located `*.spec.ts` files for controllers, services, and `src/common` utilities.

**E2E tests** — `npm run test:e2e`  
Supertest against the full `AppModule`. Requires PostgreSQL, `.env` with `DATABASE_URL` and `JWT_SECRET`. `test/setup/global-setup.ts` runs `prisma migrate deploy`; suites skip automatically if the database is unavailable.

---

## Error handling

- **Validation errors** — `ValidationPipe` returns 400 with constraint messages from DTO decorators.
- **Prisma known errors** — `PrismaExceptionFilter` maps to 400 with `{ statusCode, message, error: code }`.
- **Prisma validation errors** — `PrismaValidationExceptionFilter` (invalid query shape).
- **Repository layer** — `handlePrismaError` in repositories normalizes create/update/delete failures.
- **Domain errors** — `NotFoundException`, `UnauthorizedException` from Nest HTTP exceptions.

---
