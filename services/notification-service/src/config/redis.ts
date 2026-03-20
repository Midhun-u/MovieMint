import {createClient} from 'redis'
import { envVariables } from '../utils/envVariables'

// Redis connection for using with websocket
export const redis = createClient({
    url: `${envVariables.REDIS_HOST}:${envVariables.REDIS_PORT}`
}).on("error", (error) => {
    console.log(`Redis is not connected due to ${error.message}`)
})

// Connecting redis
export const connectRedis = async () => {

   await redis.connect()
   console.log("Redis is connected")

}