import { Worker } from "bullmq";
import { notificationQueueName } from "../queues/notificationQueue";
import { redisConnection } from "../config/ioredis";
import { connectDatabase } from "../config/sequelize";
import { NotificationModel } from "../models/notification.model";
import { listerQueue } from "../queues/listenerQueue";

const notificationWorker = new Worker(notificationQueueName, async (job) => {

    try {

        const notificationId = job.data?.notificationId
        if (!notificationId) {
            throw new Error(`Notification id is required`)
        }

        // Connecting database
        await connectDatabase()

        // Updating notification
        const { updatedDocuments } = await NotificationModel.updateNotificationById(notificationId, {
            status: "AVAILABLE"
        })

        return updatedDocuments[0]

    } catch (error: any) {
        console.log(`Couldn't update the movie: ${error.message}`)
    }

}, { connection: redisConnection, concurrency: 2 })

notificationWorker.on("completed", async (job, result) => {

    console.log(`Job is completed id: `, job.id)

    // Adding job for informing that job is completed
    await listerQueue.add(`job-${job.id}`, result)

})

notificationWorker.on("failed", (job, error) => {
    console.log(`Job is couldn't complete due to ${error}`)
})