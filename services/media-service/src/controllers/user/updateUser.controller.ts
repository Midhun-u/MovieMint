import type { Request, Response } from "express";
import { handleError } from "../../utils/handleError.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { deleteFileFromDisk, readFileFromDisk } from "../../utils/fileOperations.js";
import { UserImageModel } from "../../models/userImage.model.js";
import path from 'path'
import { uploadImage } from "../../supabase/uploadImage.js";
import type { ContentType } from "../../types/imageType.js";
import { getImage } from "../../supabase/getImage.js";
import { deleteImage } from "../../supabase/deleteImage.js";
import { updateImage } from "../../supabase/updateImage.js";

// Controller for updating user image
export const updateUserImageController = handleError(async (request: Request, response: Response) => {

    const file = request.file
    const authUser = request.user

    if (!file) {
        return sendResponse(response, false, 400, "File is required")
    }

    if (!authUser) {
        if (file) {
            // Deleting file from disk
            await deleteFileFromDisk(file.path)
        }

        return sendResponse(response, false, 400, "User is missing")
    }

    const userImage = await UserImageModel.getImageByUserId(authUser.id) as any
    if (!userImage) {

        const fileBuffer = await readFileFromDisk(file.path)
        const extname = path.extname(file.path)

        // Uploading image to supabase
        const { data, error: uploadError } = await uploadImage({
            id: authUser.id,
            path: file.path,
            file: fileBuffer,
            extname: extname,
            bucketName: "users",
            contentType: `image/${extname.replace(".", "")}` as ContentType
        })

        if (!data || uploadError) {
            return sendResponse(response, false, 502, "Image couldn't upload")
        }

        const { publicUrl, error: getError } = await getImage(data.path, "users")

        if (!publicUrl || getError) {
            return sendResponse(response, false, 502, "Image couldn't get")
        }

        const newImage = await UserImageModel.addImage({
            userId: authUser.id,
            imageUrl: publicUrl,
            imageFullPath: data.fullPath,
            imagePath: data.path,
            imageType: `image/${extname.replace(".", "")}` as ContentType
        })

        if (newImage) {
            return sendResponse(response, true, 201, null, newImage, "Image is added")
        } else {

            // Deleting image from supabase
            await deleteImage(data.path, "users")
            return sendResponse(response, false, 400, "Couldn't add the image")

        }

    } else if (userImage && !userImage.image_path) {

        const fileBuffer = await readFileFromDisk(file.path)
        const extname = path.extname(file.path)

        // Uploading image to supabase
        const { data, error: uploadError } = await uploadImage({
            id: authUser.id,
            path: file.path,
            file: fileBuffer,
            extname: extname,
            bucketName: "users",
            contentType: `image/${extname.replace(".", "")}` as ContentType
        })

        if (!data || uploadError) {
            return sendResponse(response, false, 502, "Image couldn't upload")
        }

        const { publicUrl, error: getError } = await getImage(data.path, "users")

        if (!publicUrl || getError) {
            return sendResponse(response, false, 502, "Image couldn't get")
        }

        const updatedImage = await UserImageModel.updateImageById(userImage.id, {
            imageUrl: publicUrl,
            imageFullPath: data.fullPath,
            imageType: `image/${extname.replace(".", "")}` as ContentType,
            imagePath: data.path
        })

        if(updatedImage){
            return sendResponse(response, true, 200, null, updatedImage, "Image is updated")
        }else{
            return sendResponse(response, false, 400, "Couldn't update image")
        }

    } else {

        const fileBuffer = await readFileFromDisk(file.path)
        const extname = path.extname(file.path)

        const { data, error } = await updateImage(userImage.image_path, "users", fileBuffer, file.path, `image/${extname.replace(".", "")}` as ContentType)
        if (!data || error) {
            return sendResponse(response, false, 502, "Image couldn't update")
        }

        return sendResponse(response, true, 200, null, null, "Image is updated")

    }

}, "updateUserImageController error")