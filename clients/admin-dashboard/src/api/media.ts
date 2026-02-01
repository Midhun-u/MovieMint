import { handleError } from "../utils/handleError";
import { mediaAxiosInstance } from "./axiosInstance";

// Api for uploading movie poster 
export const uploadMoviePosterApi = handleError(async (poster: File) => {

    if(!poster) return {success: false, errorMessage: "File is required"}

    const result = await mediaAxiosInstance.post("/movie/poster/upload-image", {})
    return result

})