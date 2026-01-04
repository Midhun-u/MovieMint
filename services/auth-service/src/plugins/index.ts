import fastifyPlugin from 'fastify-plugin'
import { initEnvPlugin } from './env.js'
import Fastify from 'fastify'

// For initializing all plugins
export const initPlugins = fastifyPlugin(async(fastify) => {

    await fastify.register(initEnvPlugin)

})