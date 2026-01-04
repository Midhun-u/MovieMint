import Fastify from "fastify"
import { initPlugins } from "./plugins/index.js"
import { authRoutes } from "./routes/route.js"
import { loggerConfig } from "./config/logger.js"

// App instance
const app = Fastify({
    logger: loggerConfig,
})

// Variables
const port = 5000

//Initializing all plugins
app.register(initPlugins)

// Routes
app.register(authRoutes, {prefix: "/api/v1/auth"})

// Listening port
app.listen({port: port}, (error, address) => {

    if(error){
        console.error(error)
        process.exit(1)
    }

    console.log(`Server running on ${address}`)

})