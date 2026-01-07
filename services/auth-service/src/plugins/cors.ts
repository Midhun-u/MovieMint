import fastifyPlugin from "fastify-plugin";
import cors from '@fastify/cors'
import { envVariables } from "../utils/envVariables.js";

// Plugin for CORS
export const initCors = fastifyPlugin(async (fastify) => {

    await fastify.register(cors, {
        origin: envVariables.CLIENT_URL as string,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })

})