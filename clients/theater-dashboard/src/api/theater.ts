import { handleError } from "../utils/handleError";
import { theaterAxiosInstance } from "./axiosInstance";

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

// Api for updating theater
export const updateTheaterApi = handleError(async (theaterId: string, updatedBody: object = {}) => {

    const result = await theaterAxiosInstance.patch(`/update-theater/${theaterId}`, updatedBody, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})