import express from 'express'
import { upload } from '../config/multer.js'
import { uploadTheaterImageController } from '../controllers/uploadTheaterImage.controller.js'
import { theaterOwnerAuthMiddleware } from '../middlewares/theatereOwnerAuth.js'

// Theater image router
export const theaterImageRouter = express()

// Route for uploading theater image
theaterImageRouter.post("/upload-image", theaterOwnerAuthMiddleware, upload.single("file"), uploadTheaterImageController)