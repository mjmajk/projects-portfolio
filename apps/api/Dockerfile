# Use the official Node.js 18 LTS image as a base
FROM node:20-alpine AS build

ENV CI=true

# Install pnpm and Nx CLI globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy root-level workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json ./

COPY . .

RUN pnpm install 

# Copy the entire monorepo

RUN pwd

# Build the application

WORKDIR /app/apps/api

RUN npx prisma generate

WORKDIR /app

ENV NODE_ENV='development'

RUN npx nx run api:build 

FROM node:20-alpine AS app

WORKDIR /app

COPY --from=build /app/dist/apps/api  .
COPY --from=build /app/apps/api/public  /usr/src/app/uploads

COPY --from=build /app/apps/api/prisma ./prisma
COPY --from=build /app/schema.graphql /app/schema.graphql

RUN npm install -g pnpm

RUN pnpm install 

RUN npx prisma generate

CMD ["node", "./main.js"]


