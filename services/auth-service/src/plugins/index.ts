import fastifyPlugin from 'fastify-plugin'
import { initDatabase } from './db.js'
import { initCors } from './cors.js'
import { initJWT } from './jwt.js'
import { initRedis } from './redis.js'

// For initializing all plugins
export const initPlugins = fastifyPlugin((fastify) => {

    fastify.register(initCors)
    fastify.register(initDatabase)
    fastify.register(initJWT)
    fastify.register(initRedis)

})