# Use the official Node.js 18 LTS image as a base
FROM node:20.15.1 AS setup

ENV NODE_ENV='development'
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

ENV NODE_ENV='production'

RUN npx nx run api:build 

CMD ["node", "./dist/apps/api/main.js"]


