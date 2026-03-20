import { Worker } from "bullmq";
import { notificationQueueName } from "../queues/notificationQueue";
import { redisConnection } from "../config/ioredis";
import { connectDatabase } from "../config/sequelize";
import { NotificationModel } from "../models/notification.model";

const notificationWorker = new Worker(notificationQueueName, async (job) => {

    try {

        const notificationId = job.data?.notificationId
        if (!notificationId) {
            throw new Error(`Notification id is required`)
        }

        // Connecting database
        await connectDatabase()

        // Updating notification
        await NotificationModel.updateNotificationById(notificationId, {
            status: "AVAILABLE"
        })

    } catch (error: any) {
        console.log(`Couldn't update the movie: ${error.message}`)
    }

}, { connection: redisConnection, concurrency: 2 })

notificationWorker.on("completed", (job) => {
    console.log(`Job is completed: ${job.id}`)
})

notificationWorker.on("failed", (job, error) => {
    console.log(`Job is couldn't complete due to ${error}`)
})