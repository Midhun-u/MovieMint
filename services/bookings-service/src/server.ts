import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { envVariables } from './utils/envVariables.js'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { connectDatabase } from './config/db.js'
import { checkoutRouter } from './routes/checkout.route.js'
import { notFound } from './utils/notFound.js'
import { errorHandler } from './utils/errorHandler.js'
import { bookingsRouter } from './routes/bookings.route.js'
import { connecteRedis } from './config/redis.js'

// App instance
const app = new Hono({strict: false})

// Middlewares
app.use(cors({
  origin: [envVariables.APP_URL],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(logger())
app.onError(errorHandler)

// Routes
app.route("/api/v1/checkout", checkoutRouter)
app.route("/api/v1/bookings", bookingsRouter)
app.notFound(notFound)


serve({
  fetch: app.fetch,
  port: envVariables.PORT
}, async () => {

  console.log(`Server is running on ${envVariables.PORT} port`)
  
  // Connecting to databases
  await Promise.all([
    connectDatabase(),
    connecteRedis()
  ])
  
})
