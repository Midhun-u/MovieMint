import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { deleteFileFromDisk, readFileFromDisk } from "../utils/fileOperations.js";
import { sendResponse } from "../utils/sendResponse.js";
import { MoviePosterModel } from "../models/moviePoster.model.js";
import { MovieBannerModel } from "../models/movieBanner.model.js";
import { updateImage } from "../supabase/updateImage.js";
import path from 'path'
import type { ContentType } from "../types/imageType.js";

// Controller for updating movie image
export const updateMovieImageController = handleError(async (request: Request, response: Response) => {

    const { type, movieId } = request.params as { type: "poster" | "banner", movieId: string }
    const file = request.file

    if (!type || !movieId || !file) {

        // Deleting file from disk
        if (file) {
            await deleteFileFromDisk(file.path)
        }

        return sendResponse(response, false, 400, "All fields are required")

    }

    if (type === "poster") {

        const poster = await MoviePosterModel.getPosterByMovieId(movieId)
        if (!poster) {

            // Deleting file from disk
            await deleteFileFromDisk(file.path)

            return sendResponse(response, false, 404, "Poster is not found")

        }

        const fileBuffer = await readFileFromDisk(file.path)
        const contentType = `image/${path.extname(file.path).replace(".", "")}`

        const { data, error } = await updateImage(
            poster.image_path,
            "moviePosters",
            fileBuffer,
            file.path,
            contentType as ContentType
        )

        if (!data || error) {
            return sendResponse(response, false, 502, "Image couldn't update")
        }

        return sendResponse(response, true, 200, null, poster, "Image is updated")

    } else {

        const banner = await MovieBannerModel.getBannerByMovieId(movieId)
        if (!banner) {

            // Deleting file from disk
            await deleteFileFromDisk(file.path)
            return sendResponse(response, false, 404, "Poster is not found")

        }

        const fileBuffer = await readFileFromDisk(file.path)
        const contentType = `image/${path.extname(file.path).replace(".", "")}`

        const { data, error } = await updateImage(
            banner.image_path,
            "movieBanners",
            fileBuffer,
            file.path,
            contentType as ContentType
        )

        if (!data || error) {
            return sendResponse(response, false, 502, "Image couldn't update")
        }

        return sendResponse(response, true, 200, null, banner, "Image is updated")

    }

}, "updateMovieImageController error")