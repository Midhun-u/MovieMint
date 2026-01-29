import { Hono } from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import { envVariables } from './utils/envVariables'

// App instance
const app = new Hono({strict: false})
const port = Number(envVariables.PORT) || 5080

// Middlewares
app.use(logger())
app.use(cors({
  origin: [
    envVariables.ADMIN_DASHBOARD_URL
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

export {
  app,
  port
}