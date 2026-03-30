import {createClient} from 'redis'
import { envVariables } from '../utils/envVariables.js'

export const redis = createClient({
    url: envVariables.REDIS_URL
})

redis.on("error", (error) => console.log(`Redis is not connected due to ${error}`))

// Function for connecting to redis
export const connecteRedis = async () => {

    await redis.connect()
    console.log(`Redis is connected to ${envVariables.REDIS_URL}`)

}