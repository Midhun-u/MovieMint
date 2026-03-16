import Fastify from "fastify"
import { initPlugins } from "./plugins/index.js"
import { authRoutes } from "./routes/user.route.js"
import { loggerConfig } from "./config/logger.js"
import { envVariables } from "./utils/envVariables.js"
import { rateRoutes } from "./routes/rate.route.js"

// App instance
const app = Fastify({
    logger: loggerConfig,
})

//Initializing all plugins
app.register(initPlugins)

//Variables
const port = Number(envVariables.PORT) || 5000

// Routes
app.register(authRoutes, {prefix: "/api/v1/auth"})
app.register(rateRoutes, {prefix: "/api/v1/rate"})

// Listening port
app.listen({port: port}, (error, address) => {

    if(error){ 
        console.error(error)
        process.exit(1)
    }

    console.log(`Server running on ${address}`)

})