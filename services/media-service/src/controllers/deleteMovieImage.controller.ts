import type { Request, Response } from "express";
import { handleError } from "../utils/handleError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { MoviePosterModel } from "../models/moviePoster.model.js";
import { MovieBannerModel } from "../models/movieBanner.model.js";
import { deleteImage } from "../supabase/deleteImage.js";

// Controller deleting movie image
export const deleteMovieImageController = handleError(async (request: Request, response: Response) => {

    const { imageId, type } = request.params as { imageId: string, type: "poster" | "banner" } || {}

    if (!imageId || !type) {
        return sendResponse(response, false, 400, "All fields are required")
    }

    if (type === "poster") {

        const poster = await MoviePosterModel.getPosterById(imageId)

        if (!poster) return sendResponse(response, false, 404, "Poster is not found")

        // Deleting image from supabase
        const { data, error } = await deleteImage(poster.image_path, "moviePosters")

        if (error) return sendResponse(response, false, 502, "Couldn't delete the image")
        if (!data?.length) return sendResponse(response, false, 502, "Couldn't delete the image")
        const deletedCount = await MoviePosterModel.deletePosterById(poster.id)

        if (!deletedCount) return sendResponse(response, false, 502, "Couldn't delete the image")

        return sendResponse(response, true, 200, null, null, "Image is deleted")

    } else {

        const banner = await MovieBannerModel.getBannerById(imageId)

        if (!banner) return sendResponse(response, false, 404, "Banner is not found")

        // Deleting image from supabase
        const { data, error } = await deleteImage(banner.image_path, "movieBanners")

        if (error) return sendResponse(response, false, 502, "Couldn't delete the image")
        if (!data?.length) return sendResponse(response, false, 502, "Couldn't delete the image")
        const deletedCount = await MovieBannerModel.deleteBannerById(banner.id)

        if (!deletedCount) return sendResponse(response, false, 502, "Couldn't delete the image")

        return sendResponse(response, true, 200, null, null, "Image is deleted")

    }

}, "deleteMovieController error")