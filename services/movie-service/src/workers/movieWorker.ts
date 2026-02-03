import { Worker } from "bullmq";
import { movieQueueName } from "../queues/movieQueue";
import { redisConnection } from "../config/ioredis";
import { MovieModel } from "../models/movie.model";
import { connectDatabase } from "../config/db";

// Movie worker
const movieWorker = new Worker(movieQueueName, async (job) => {

    const {movieId} = job.data as {movieId: string}
    
    try {

        if(!movieId){
            throw new Error(`Movie id is missing`)
        }

        // Connecting database
        await connectDatabase()
        
        // Updating data
        await MovieModel.updateMovieById(movieId, { 
            status: "SHOWING"
        })

    } catch (error: any) {
        console.log(`Couldn't update the movie: ${error.message}`)
    }

}, {connection: redisConnection, concurrency: 2})

movieWorker.on("completed", (job) => {
    console.log(`Job is completed: ${job.id}`)
})

movieWorker.on("failed", (job, error) => {
    console.log(`Job is couldn't complete due to ${error}`)
})