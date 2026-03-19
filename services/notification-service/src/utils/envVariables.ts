// Env variables
export const envVariables = {
    PORT: Number(Bun.env.PORT),
    DB_DATABASE_NAME: Bun.env.DB_DATABASE_NAME as string,
    DB_USERNAME: Bun.env.DB_USERNAME as string,
    DB_PASSWORD: Bun.env.DB_PASSWORD as string,
    DB_PORT: Number(Bun.env.DB_PORT),
    DB_HOST: Bun.env.DB_HOST as string
}