import express from 'express'

// User Images router
export const userImageRouter = express()

userImageRouter.get("/", (request, response) => {
    response.status(200).json({success: true, message: "Hello world"})
})