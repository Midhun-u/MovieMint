ARG bun_version=oven/bun:latest

# Build layer
FROM ${bun_version}

WORKDIR /app

COPY ./package.json ./

RUN bun install

COPY ./ ./

EXPOSE 5090

CMD [ "bun", "run", "start" ]