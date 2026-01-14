import {createClient} from 'redis'
import { envVariables } from '../utils/envVariables.js'

export const redisClient = createClient({
    socket: {
        host: envVariables.REDIS_HOST,
        port: envVariables.REDIS_PORT
    }
})