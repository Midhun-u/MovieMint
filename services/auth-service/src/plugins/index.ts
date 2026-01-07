import fastifyPlugin from 'fastify-plugin'
import { initDatabase } from './db.js'
import { initCors } from './cors.js'
import { initJWT } from './jwt.js'

// For initializing all plugins
export const initPlugins = fastifyPlugin(async(fastify) => {

    await fastify.register(initCors)
    await fastify.register(initDatabase)
    await fastify.register(initJWT)

})