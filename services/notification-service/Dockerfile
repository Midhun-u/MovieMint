ARG bun_version=oven/bun:latest

FROM ${bun_version}

WORKDIR /app

COPY ./package.json ./

RUN bun install

COPY ./ ./

EXPOSE 8000

CMD [ "bun", "run", "start" ]