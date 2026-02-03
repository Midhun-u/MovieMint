import express from 'express'
import { uploadActorImageController } from '../controllers/uploadActorImage.controller.js'
import { upload } from '../config/multer.js'
import { deleteActorImageController } from '../controllers/deleteActorImage.controller.js'
import { adminAuthMiddleware } from '../middlewares/adminAuth.js'

// Actor image router
export const actorRouter = express()

// Route for adding actor image
actorRouter.post("/upload-image", adminAuthMiddleware, upload.single("file"),uploadActorImageController)

// Route for deleting actors image
actorRouter.delete("/delete-image/:movieId", adminAuthMiddleware, deleteActorImageController)