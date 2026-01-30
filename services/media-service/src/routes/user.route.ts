import express from 'express'
import { uploadUserImageController } from '../controllers/uploadUserImage.controller.js'
import { upload } from '../config/multer.js'
import { getUserImageController } from '../controllers/getUserImage.controller.js'

// User Images router
export const userImageRouter = express()

// Route for uploading user images
userImageRouter.post("/upload-image", upload.single("file"), uploadUserImageController)

// Route for getting user image
userImageRouter.get("/get-image/:userId", getUserImageController)