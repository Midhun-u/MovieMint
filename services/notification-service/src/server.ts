import {Hono} from 'hono'
import { errorHandler } from './utils/errorHandler'
import { notFound } from './utils/notFound'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'

// App instance
export const app = new Hono({strict: false})

// Middlewares
app.use(cors({
    origin: [],
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true
}))
app.use(logger())

// Routes
app.onError(errorHandler)
app.notFound(notFound)