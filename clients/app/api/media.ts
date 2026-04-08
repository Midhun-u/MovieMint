'use server'

import { envVariables } from "@/utils/envVariables";
import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";

const MEDIA_BASE_URL = envVariables.MEDIA_URL

// Api for uploading theater image
export const uploadTheaterImageApi = handleError(async (theaterId: string, file: File, authToken: string) => {

    if(!theaterId) return {success: false}

    const formData = new FormData()
    formData.append("theaterId", theaterId)
    formData.append("file", file)

    const result = await fetchInstance(MEDIA_BASE_URL, "/theater/upload-image", "POST", formData, "formData", authToken)
    return result

})

// Api for deleting theater image
export const deleteTheaterImageApi = handleError(async (theaterId: string, authToken: string) => {

    const result = await fetchInstance(MEDIA_BASE_URL, `/theater/delete-image/${theaterId}`, "DELETE", {}, "json", authToken)
    return result

})

// Api for getting actors images
export const getActorsImagesApi = handleError(async (movieId: string) => {

    const result = await fetchInstance(MEDIA_BASE_URL, `/movie/get-actors-images/${movieId}`, "GET", {}, "json")
    return result

})

// Api for updating user image
export const updateUserImageApi = handleError(async (file: File, authToken: string) => {

    const formData = new FormData()
    formData.append("file", file)

    const result = await fetchInstance(MEDIA_BASE_URL, "/user/update-image", "PATCH", formData, "formData", authToken)
    return result

})