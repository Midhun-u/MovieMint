import fastifyPlugin from "fastify-plugin";
import jwt from '@fastify/jwt'
import { envVariables } from "../utils/envVariables.js";

// Plugin for JWT
export const initJWT = fastifyPlugin((fastify) => {

    fastify.register(jwt, {
        secret: envVariables.JWT_SECRET as string
    })

}) 