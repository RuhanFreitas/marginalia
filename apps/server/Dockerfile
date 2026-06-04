FROM node:22-alpine AS deps

WORKDIR /app

ENV npm_config_update_notifier=false \
    npm_config_fund=false \
    npm_config_audit=false

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/

RUN npm ci --workspace=server --include-workspace-root

FROM deps AS build

COPY tsconfig.base.json ./
COPY apps/server ./apps/server

WORKDIR /app/apps/server

RUN npx prisma generate
RUN npm run build

FROM deps AS prod-deps

ENV NODE_ENV=production

RUN npm prune --omit=dev

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/apps/server/dist ./apps/server/dist
COPY --from=build /app/apps/server/prisma ./apps/server/prisma
COPY --from=build /app/apps/server/prisma.config.ts ./apps/server/prisma.config.ts
COPY --from=build /app/apps/server/src/generated ./apps/server/src/generated
COPY apps/server/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

WORKDIR /app/apps/server

EXPOSE 3001

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "dist/src/main.js"]
