import { handleError } from "../utils/handleError";
import { mediaAxiosInstance } from "./axiosInstance";

// Api for uploading movie image 
export const uploadMovieImageApi = handleError(async (file: File, movieId: string, type: "poster" | "banner") => {

    if(!file || !movieId) return {success: false, errorMessage: "All fields are required"}

    const formDate = new FormData()
    formDate.append("file", file)
    formDate.append("movieId", movieId)
    formDate.append("type", type)

    const result = await mediaAxiosInstance.post("/movie/upload-image", formDate)
    return result

})

// Api for uploading actors image
export const uploadActorsImageApi = handleError(async () => {

    

})