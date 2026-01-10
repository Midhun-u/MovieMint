import express from 'express'
import { envVariables } from './utils/envVariables.js'

// App instance
const app = express()

const port = envVariables.PORT || 5050

// Listening port
app.listen(port, () => {

    console.log(`Server running on ${port} port`)

})