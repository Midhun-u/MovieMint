import { handleError } from "../utils/handleError";
import { mediaAxiosInstance } from "./axiosInstance";

const authToken = localStorage.getItem("authToken")

// Api for uploading movie image 
export const uploadMovieImageApi = handleError(async (file: File, movieId: string, type: "poster" | "banner") => {

    if (!file || !movieId) return { success: false, errorMessage: "All fields are required" }

    const formDate = new FormData()
    formDate.append("file", file)
    formDate.append("movieId", movieId)
    formDate.append("type", type)

    const result = await mediaAxiosInstance.post("/movie/upload-image", formDate, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return result.data

})

// Api for uploading actor image
export const uploadActorImageApi = handleError(async (data: {actorImage: File, actorId: string, movieId: string }) => {

    const formData = new FormData()
    formData.append("file", data.actorImage)
    formData.append("actorId", data.actorId)
    formData.append("movieId", data.movieId)

    const actorResult = await mediaAxiosInstance.post("/actor/upload-image", formData,{
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return actorResult.data

})

// Api for deleting movie image
export const deleteMovieImageApi = handleError(async (movieId: string, type: "poster" | "banner") => {

    const result = (await mediaAxiosInstance.delete(`/movie/delete-image/${movieId}/${type}`,{
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })).data
    return result

})

// Api for deleting actor image
export const deleteActorImageApi = handleError(async (movieId: string) => {

    const result = (await mediaAxiosInstance.delete(`/actor/delete-image/${movieId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })).data
    return result

})