import fastifyPlugin from 'fastify-plugin'
import { initDatabase } from './db.js'

// For initializing all plugins
export const initPlugins = fastifyPlugin(async(fastify) => {

    await fastify.register(initDatabase)

})