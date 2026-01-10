import express from 'express'
import { envVariables } from './utils/envVariables.js'
import { connectDatabase } from './config/sequelize.js'
import { userImageRouter } from './routes/route.js'
import morgan from 'morgan'

// App instance
const app = express()

const port = envVariables.PORT || 5050

// Middlewares
app.use(morgan("dev"))

// Routes
app.use("/api/v1/userImage", userImageRouter)

// Listening port
app.listen(port, () => {
    
    console.log(`Server running on ${port} port`)
    
    // Connecting database
    connectDatabase()

})