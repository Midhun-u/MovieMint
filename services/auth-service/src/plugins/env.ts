import fastifyEnv from "@fastify/env";
import fastifyPlugin from "fastify-plugin";
import { envOptions } from "../config/env.js";

// Plugin for ENV file
export const initEnvPlugin = fastifyPlugin(async(fastify) => {
    
    await fastify.register(fastifyEnv, envOptions)

})