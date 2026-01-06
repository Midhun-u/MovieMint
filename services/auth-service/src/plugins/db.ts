import fastifyPlugin from "fastify-plugin";
import { connectDatabase } from "../config/sequlize.js";

// Plugin for connecting database
export const initDatabase = fastifyPlugin(async(fastify) => {

    await fastify.register(connectDatabase)

})