ARG node_version=node:20-alpine

# Build Layer
FROM ${node_version} AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Final Layer
FROM ${node_version} AS runner

WORKDIR /app

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/public /app/public

EXPOSE 3000

CMD [ "npm" , "start"]