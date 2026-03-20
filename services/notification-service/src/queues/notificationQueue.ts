import { Queue } from "bullmq";
import { redisConnection } from "../config/ioredis";

export const notificationQueueName = "notification"
export const notificationQueue = new Queue(notificationQueueName, {
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 2
    },
    connection: redisConnection,

})