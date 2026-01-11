import express from 'express'
import { uploadUserImageController } from '../controllers/uploadUserImage.controller.js'
import { upload } from '../config/multer.js'

// User Images router
export const userImageRouter = express()

// Route for uploading user images
userImageRouter.post("/upload", upload.single("file"), uploadUserImageController)