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
    console.log(formData)

    const result = await fetchInstance(MEDIA_BASE_URL, "/theater/upload-image", "POST", formData, "formData", authToken)
    return result

})