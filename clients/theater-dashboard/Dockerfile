ARG bun_version=oven/bun:latest
ARG nginx_version=nginx:alpine

# Build layer
FROM ${bun_version} AS builder

WORKDIR /app

COPY ./package.json ./

RUN bun install

COPY  ./ ./

RUN bun run build

# Final layer
FROM ${nginx_version} AS runner

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx" , "-g", "daemon off;"]