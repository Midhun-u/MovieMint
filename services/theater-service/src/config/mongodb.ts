import mongoose from "mongoose"
import { envVariables } from "../utils/envVariables"

// Function for connecting mongodb
export const connectToMongodbDatabase = async () => {

    try {
        
        const {connection} = await mongoose.connect(envVariables.MONGODB_URL)
        console.log(`Mongodb is connnected ${connection.host}`)

    } catch (error: any) {
        console.log(`Mongodb is not connected due to ${error.message}`)
    }

}