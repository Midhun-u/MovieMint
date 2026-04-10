import { Hono } from 'hono'
import { errorHandler } from './utils/errorHandler'
import { notFound } from './utils/notFound'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { connectDatabase } from './config/sequelize'
import { notificationRouter } from './routes/route'
import { envVariables } from './utils/envVariables'

// App instance
export const app = new Hono({ strict: false })

// Middlewares
app.use(cors({
    origin: [envVariables.APP_URL, envVariables.ADMIN_DASHBOARD_URL],
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true
}))
app.use(logger())

// Connecting database
connectDatabase()

// Routes
app.route("/api/v1/notification", notificationRouter)

// Routes
app.onError(errorHandler)
app.notFound(notFound)