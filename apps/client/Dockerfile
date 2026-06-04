FROM node:22-alpine AS deps

WORKDIR /app

ENV npm_config_update_notifier=false \
    npm_config_fund=false \
    npm_config_audit=false

COPY package.json package-lock.json ./
COPY apps/client/package.json ./apps/client/
COPY packages/ui/package.json ./packages/ui/

RUN npm ci --workspace=frontend --include-workspace-root

FROM deps AS build

ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_OPTIONS=--max-old-space-size=768

COPY tsconfig.base.json ./
COPY packages/ui ./packages/ui
COPY apps/client ./apps/client

RUN npm run build --workspace=frontend

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV API_INTERNAL_URL=http://server:3001

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=build /app/apps/client/public ./apps/client/public
COPY --from=build --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/client/server.js"]
