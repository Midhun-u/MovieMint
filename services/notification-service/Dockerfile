ARG bun_version=oven/bun:latest

# Base layer
FROM ${bun_version} AS builder

WORKDIR /app

COPY ./ ./

RUN bun install

RUN bun run build

# Final layer
FROM ${bun_version} AS runner

WORKDIR /app

COPY --from=builder /app/bundle.js ./
COPY --from=builder /app/.env ./.env

EXPOSE 8000

CMD [ "bun", "./bundle.js" ]