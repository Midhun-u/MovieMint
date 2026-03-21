import { Worker } from "bullmq";
import { WSContext } from "hono/ws";
import { listernerQueueName } from "../queues/listenerQueue";
import { redisConnection } from "../config/ioredis";

export const onOpen = async (event: Event, ws: WSContext<any>) => {

    const worker = new Worker(listernerQueueName, async (job) => {
        return job.data
    }, {connection: redisConnection})
    
    worker.on("completed", async (job, data) => {
        ws.send(JSON.stringify(data))
    })

}