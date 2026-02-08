import express from 'express'
import { upload } from '../config/multer.js'
import { uploadTheaterImageController } from '../controllers/uploadTheaterImage.controller.js'
import { theaterOwnerAuthMiddleware } from '../middlewares/theatereOwnerAuth.js'
import { getTheaterImageController } from '../controllers/getTheaterImage.controller.js'

// Theater image router
export const theaterImageRouter = express()

// Route for uploading theater image
theaterImageRouter.post("/upload-image", theaterOwnerAuthMiddleware, upload.single("file"), uploadTheaterImageController)

// Route for getting theater image
theaterImageRouter.get("/get-image/:theaterId", getTheaterImageController)