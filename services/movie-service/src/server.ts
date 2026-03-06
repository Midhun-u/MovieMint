import { Hono } from 'hono'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import { envVariables } from './utils/envVariables'
import { errorHandler } from './utils/errorHandler'
import { notFound } from './utils/notFound'
import { movieRouter } from './routes/routes'
import { connectDatabase } from './config/db'

// App instance
const app = new Hono({strict: false})
const port = Number(envVariables.PORT) || 5080

// Middlewares
app.use(logger())
app.use(cors({
  origin: [
    envVariables.ADMIN_DASHBOARD_URL,
    envVariables.THEATER_DASHBOARD_URL,
    envVariables.APP_URL
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

// Routes
app.onError(errorHandler)
app.notFound(notFound)
app.route("/api/v1/movie", movieRouter)

// Connecting database
connectDatabase()

export {
  app,
  port
}