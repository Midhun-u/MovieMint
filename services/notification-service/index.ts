import { app } from "./src/server";
import { envVariables } from "./src/utils/envVariables";

console.log(`Server is running ${envVariables.PORT} port`)
Bun.serve({
    fetch: app.fetch,
    port: envVariables.PORT
})