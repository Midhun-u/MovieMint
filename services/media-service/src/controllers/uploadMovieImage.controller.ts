import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import { uploadImage } from "../supabase/uploadImage.js";
import path from 'path'
import type { ContentType } from "../types/imageType.js";
import { MoviePosterModel } from "../models/moviePoster.model.js";
import { getImage } from "../supabase/getImage.js";
import { MovieBannerModel } from "../models/movieBanner.model.js";

// Controller for uploading movie image
export const uploadMovieImageController = handleError(async (request: Request, response: Response) => {

    const { movieId, type } = request.body as { movieId: string, type: "poster" | "banner" } || {}
    const file = request.file

    if (!movieId || !file || !type) {

        if (file) {
            // Deleting file from disk
            deleteFileFromDisk(file.path)
        }

        return sendResponse(response, false, 400, "All fields are required", null)

    }

    // Checking if movie image exists
    if(type === "poster"){

        const poster = await MoviePosterModel.getPosterByMovieId(movieId)
        if(poster){

            // Deleting file from disk
            deleteFileFromDisk(file.path)

            return sendResponse(response, false, 409, "Movie poster is already exist")
        }

    }else{

        const banner = await MovieBannerModel.getBannerByMovieId(movieId)
        if(banner){

            // Deleting file from disk
            deleteFileFromDisk(file.path)

            return sendResponse(response, false, 409, "Movie banner is already exist")
        }

    }

    // Reading file from disk
    const fileBuffer = await readFileFromDisk(file.path)
    const extname = path.extname(file.path)

    // Uploading movie image file to supabase
    const { data, error } = await uploadImage({
        id: movieId,
        path: file.path,
        file: fileBuffer,
        extname: extname,
        bucketName: type === "poster" ? "moviePosters" : "movieBanners",
        contentType: `image/${extname.replace(".", "")}` as ContentType
    })

    if (error) {
        return sendResponse(response, false, 502, "Couldn't upload movie poster")
    }

    if (data) {

        const { error, publicUrl } = await getImage(data.path, type === "poster"? "moviePosters": "movieBanners")

        if (error || !publicUrl) {
            return sendResponse(response, false, 502, "Couldn't get the image")
        }

        if (type === "poster") {

            const newMoviePoster = await MoviePosterModel.addPoster({
                movieId: movieId,
                imageUrl: publicUrl,
                imageFullPath: data.fullPath,
                imagePath: data.path,
                imageType: `image/${extname.replace(".", "")}` as ContentType
            })

            if (newMoviePoster) {
                return sendResponse(response, true, 201, null, {
                    moviePoster: newMoviePoster
                }, "Movie poster is uploaded")
            }

        } else {

            const newMovieBanner = await MovieBannerModel.addBanner({
                movieId: movieId,
                imageUrl: publicUrl,
                imageFullPath: data.fullPath,
                imagePath: data.path,
                imageType: `image/${extname.replace(".", "")}` as ContentType
            })

            if (newMovieBanner) {
                return sendResponse(response, true, 201, null, {
                    movieBanner: newMovieBanner
                }, "Movie poster is uploaded")
            }

        }

    }

    return sendResponse(response, false, 400, "Something went wrong")

}, "uploadMoviePosterController error")