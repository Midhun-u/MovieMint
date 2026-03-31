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
import {createNodeWebSocket} from '@hono/node-ws'
import {serve} from '@hono/node-server'
import { onOpen } from './websocket/onOpen.js'
import { onMessage } from './websocket/onMessage.js'
import { onClose } from './websocket/onClose.js'

// App instance
const app = new Hono({strict: false})

export const {injectWebSocket, upgradeWebSocket} = createNodeWebSocket({
  app: app
})

// Middlewares
app.use(cors({
  origin: [envVariables.APP_URL],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(logger())

// Routes
app.onError(errorHandler)
app.route("/api/v1/checkout", checkoutRouter)
app.route("/api/v1/bookings", bookingsRouter)
app.notFound(notFound)

// Websocket
app.get("/ws", upgradeWebSocket(context => {
  return {
    onOpen: onOpen,
    onMessage: onMessage,
    onClose: onClose
  }
}))


const server = serve({
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

// Initializing websocket
injectWebSocket(server)