import express from 'express'
import { upload } from '../config/multer.js'

// Movie image router
export const moviePosterRouter = express()

// Route for uploading poster
moviePosterRouter.post("/upload-image", upload.single("file"), moviePosterRouter)