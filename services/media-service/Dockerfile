ARG node_version=node:20-alpine

# Build layer
FROM ${node_version} AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Final layer
FROM ${node_version} AS runner

WORKDIR /app

COPY ./package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./

COPY ./.env ./

EXPOSE 5050

CMD [ "npm" , "run", "container"]