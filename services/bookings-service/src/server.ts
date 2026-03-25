import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { envVariables } from './utils/envVariables.js'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { connectDatabase } from './config/db.js'

// App instance
const app = new Hono({strict: false})

// Middlewares
app.use(cors({
  origin: [],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))
app.use(logger())


serve({
  fetch: app.fetch,
  port: envVariables.PORT
}, async () => {

  console.log(`Server is running on ${envVariables.PORT} port`)
  
  // Connecting database
  await connectDatabase()
  
})
