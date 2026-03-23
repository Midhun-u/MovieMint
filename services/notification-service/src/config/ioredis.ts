import IORedis from 'ioredis'
import { envVariables } from '../utils/envVariables'
import { ConnectionOptions } from 'bullmq'

// Redis connection for using with bullmq
export const redisConnection = new IORedis({
    maxRetriesPerRequest: null,
    host: envVariables.REDIS_HOST,
    port: Number(envVariables.REDIS_PORT),
}) as ConnectionOptions