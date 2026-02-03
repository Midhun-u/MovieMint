import IoRedis from 'ioredis'
import { envVariables } from '../utils/envVariables'

export const redisConnection = new IoRedis({
    host: envVariables.REDIS_HOST,
    port: envVariables.REDIS_PORT,
    maxRetriesPerRequest: null
})