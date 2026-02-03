import { Queue } from "bullmq";
import { redisConnection } from "../config/ioredis";

// Queue for changing movie status from "PENDING" to "AVAILABLE" 
export const movieQueueName = "movies"
export const movieQueue = new Queue(movieQueueName, {
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 2,
    },
    connection: redisConnection,
})