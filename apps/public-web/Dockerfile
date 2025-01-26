# Use the official Node.js 18 LTS image as a base
FROM node:20.15.1 AS build

ENV NODE_ENV='development'
ENV CI=true

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json ./

RUN pnpm install  --frozen-lockfile

COPY . .

ENV NODE_ENV='production'

RUN pnpm run gen

RUN npx nx run public-web:build

# Second stage
FROM node:20-alpine AS app

ENV NODE_ENV='production'

WORKDIR /app

# 1. Copy the standalone build output
COPY --from=build /app/apps/public-web/.next/standalone/apps/public-web ./
# 2. Copy .next/static into the correct relative path
COPY --from=build /app/apps/public-web/.next/static ./.next/static

COPY --from=build /app/apps/public-web/.next/server ./.next/server

# 3. Copy public (if you use any static assets in /public)
COPY --from=build /app/apps/public-web/public ./public

COPY --from=build /app/apps/public-web/.next/standalone ./


EXPOSE 3000
CMD ["node", "server.js"]