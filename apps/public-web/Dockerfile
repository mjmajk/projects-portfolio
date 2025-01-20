# Use the official Node.js 18 LTS image as a base
FROM node:20.15.1 AS builder

ENV NODE_ENV='development'
ENV CI=true

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json ./

RUN pnpm install  --frozen-lockfile

COPY . .

ENV NODE_ENV='production'

RUN pnpm run generate-types

RUN npx nx run public-web:build

EXPOSE 3000

WORKDIR /app/apps/public-web

CMD ["npx", "next", "start", "-p", "3000"]
