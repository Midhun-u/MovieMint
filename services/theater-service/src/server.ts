import { Hono } from 'hono'
import { envVariables } from './utils/envVariables'
import { notFound } from './utils/notFound'
import {logger} from 'hono/logger'
import {cors} from 'hono/cors'
import { errorHandler } from './utils/errorHandler'
import { connectDatabase } from './config/sequelize'
import { theaterRouter } from './routes/theater.route'

// App instance
const app = new Hono({strict: false})

const port = envVariables.PORT

//Middlewares
app.use(logger())
app.use(cors({
  origin: [envVariables.APP_URL, envVariables.THEATER_DASHBOARD_URL],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))

// Routes 
app.notFound(notFound)
app.onError(errorHandler)
app.route("/api/v1/theater", theaterRouter)

// Connecting database
connectDatabase()

export {
  app,
  port
}
