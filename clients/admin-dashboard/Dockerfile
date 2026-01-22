ARG node_version=node:25-alpine
ARG nginx_version=nginx:alpine

# Build layer
FROM ${node_version} AS builder

# Installing pnpm
RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN pnpm install

COPY ./ ./

RUN pnpm run build

# Final layer
FROM ${nginx_version} AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx" , "-g", "daemon off;"]