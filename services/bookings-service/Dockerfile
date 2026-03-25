ARG node_version=node:25-alpine

# Base layer
FROM ${node_version} AS builder

WORKDIR /app

# For installing pnpm
RUN npm install -g pnpm@latest

COPY ./package.json ./
COPY ./pnpm*.yaml ./

RUN pnpm install

COPY ./ ./

RUN pnpm run build

# Final layer
FROM ${node_version} AS runner

WORKDIR /app

RUN npm install -g pnpm@latest

COPY ./package.json ./
COPY ./pnpm*.yaml ./

RUN pnpm install

COPY --from=builder /app/dist /app/dist
COPY ./.env ./

EXPOSE 8080

CMD [ "pnpm", "start" ]