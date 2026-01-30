import express from 'express'
import { envVariables } from './utils/envVariables.js'
import { connectDatabase } from './config/sequelize.js'
import { userImageRouter } from './routes/user.route.js'
import morgan from 'morgan'
import cors from 'cors'
import { movieRouter } from './routes/movie.route.js'

// App instance
const app = express()

const port = envVariables.PORT || 5050

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(cors({
    origin: [envVariables.ADMIN_DASHBOARD_URL],
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
}))

// Routes
app.use("/api/v1/image/user", userImageRouter)
app.use("/api/v1/image/movie", movieRouter)

// Listening port
app.listen(port, () => {
    
    console.log(`Server running on ${port} port`)
    
    // Connecting database
    connectDatabase()

})