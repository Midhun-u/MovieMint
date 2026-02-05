import { Hono } from 'hono'
import { envVariables } from './utils/envVariables'

// App instance
const app = new Hono({strict: false})

const port = envVariables.PORT

export {
  app,
  port
}
