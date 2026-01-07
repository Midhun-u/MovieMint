ARG node_version=node:25-alpine

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

RUN npm install 

COPY --from=builder /app/dist ./

COPY ./.env ./

EXPOSE 5000

CMD [ "npm" , "run" ,"container"]