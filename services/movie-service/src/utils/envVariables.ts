// Env variables
export const envVariables = {
    PORT: Number(Bun.env.PORT),
    ADMIN_DASHBOARD_URL: Bun.env.ADMIN_DASHBOARD_URL as string,
}