import fastifyPlugin from "fastify-plugin";
import cors from '@fastify/cors'
import { envVariables } from "../utils/envVariables.js";

// Plugin for CORS
export const initCors = fastifyPlugin((fastify) => {

    fastify.register(cors, {
        origin: [envVariables.APP_CLIENT_URL, envVariables.ADMIN_DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    })

})