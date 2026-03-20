import { Hono } from 'hono'
import { errorHandler } from './utils/errorHandler'
import { notFound } from './utils/notFound'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { connectDatabase } from './config/sequelize'
import { notificationRouter } from './routes/route'
import { connectRedis } from './config/redis'

// App instance
export const app = new Hono({ strict: false })

// Middlewares
app.use(cors({
    origin: [],
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true
}))
app.use(logger())

// Routes
app.route("/api/v1/notification", notificationRouter)

// Connecting database
connectDatabase()
// Connecting redis
connectRedis()

// Routes
app.onError(errorHandler)
app.notFound(notFound)