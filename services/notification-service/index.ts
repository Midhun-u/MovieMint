import { app } from "./src/server";
import { envVariables } from "./src/utils/envVariables";
import {websocket} from 'hono/bun'

console.log(`Server is running ${envVariables.PORT} port`)
Bun.serve({
    fetch: app.fetch,
    websocket: websocket,
    port: envVariables.PORT,
})