import fastifyPlugin from "fastify-plugin";
import { connectDatabase } from "../config/sequelize.js";

// Plugin for connecting database
export const initDatabase = fastifyPlugin((fastify) => {

    fastify.register(connectDatabase)

})