import fastifyPlugin from "fastify-plugin";
import { redisClient } from "../config/redis.js";

// Plugi for redis
export const initRedis = fastifyPlugin((fastify) => {

    fastify.addHook("onReady", async () => {

        // Connecting redis
        redisClient.on("error", (error) => console.error(error))
        await redisClient.connect()

    })

})