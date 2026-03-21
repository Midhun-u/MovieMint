import { Queue } from "bullmq"
import { redisConnection } from "../config/ioredis"

// Queue for listening events from another worker
export const listernerQueueName = "listener"
export const listerQueue = new Queue(listernerQueueName, {
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 2
    },
    connection: redisConnection
})