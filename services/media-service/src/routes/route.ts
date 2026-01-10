import express from 'express'
import { uploadUserImageController } from '../controllers/uploadUserImage.controller.js'

// User Images router
export const userImageRouter = express()

// Route for uploading user images
userImageRouter.get("/", uploadUserImageController)