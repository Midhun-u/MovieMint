import { handleError } from "../utils/handleError";
import { theaterAxiosInstance, theaterShowAxiosInstance } from "./axiosInstance";

const authToken = localStorage.getItem("authToken")

// Api for fetching theater
export const getTheaterApi = handleError(async () => {

    const result = await theaterAxiosInstance.get("/get-theater-registration", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})

// Api for getting shows
export const getShowsApi = handleError(async (theaterId: string, page: number, limit: number) => {

    const result = await theaterShowAxiosInstance.get(`/get-shows/${theaterId}/?page=${page}&limit=${limit}`)
    return result.data

})