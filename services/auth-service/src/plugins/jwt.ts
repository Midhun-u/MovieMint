import fastifyPlugin from "fastify-plugin";
import jwt from '@fastify/jwt'
import { envVariables } from "../utils/envVariables.js";

// Plugin for JWT
export const initJWT = fastifyPlugin(async (fastify) => {

    await fastify.register(jwt, {
        secret: envVariables.JWT_SECRET as string
    })

}) 