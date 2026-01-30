import mongoose from "mongoose"
import { envVariables } from "../utils/envVariables"

// Function for connecting database
export const connectDatabase = async () => {

    try {
       
        const connection = await mongoose.connect(envVariables.DB_URL)
        console.log(`Database is connected ${connection.connection.host}`)
        
    } catch (error) {
        console.log(`Database is not connected ${error}`)
        process.exit(1)
    }

}