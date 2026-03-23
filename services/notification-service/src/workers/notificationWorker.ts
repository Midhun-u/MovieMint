import { Worker } from "bullmq";
import { notificationQueueName } from "../queues/notificationQueue";
import { redisConnection } from "../config/ioredis";
import { connectDatabase } from "../config/sequelize";
import { NotificationModel } from "../models/notification.model";

const notificationWorker = new Worker(notificationQueueName, async (job) => {

    try {

        const notification = job.data?.notification
        const update = job.data?.update

        if (!notification) {
            throw new Error(`Notification id is required`)
        }

        // Connecting database
        await connectDatabase()

        if (update && notification) {

            // Updating notification
            const { updatedDocuments } = await NotificationModel.updateNotificationById(notification.id, {
                status: "AVAILABLE"
            })

            return updatedDocuments[0]

        } else if (notification) {

            return notification

        }

    } catch (error: any) {
        console.log(`Couldn't update the movie: ${error.message}`)
    }

}, { connection: redisConnection, concurrency: 2 })

notificationWorker.on("completed", async (job, result) => {
    console.log(`Job is completed id: `, job.id)
})

notificationWorker.on("failed", (job, error) => {
    console.log(`Job is couldn't complete due to ${error}`)
})