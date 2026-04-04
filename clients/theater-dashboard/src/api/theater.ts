import { handleError } from "../utils/handleError";
import { theaterAxiosInstance } from "./axiosInstance";

// Api for fetching theater
export const getTheaterApi = handleError(async (authToken: string) => {

    const result = await theaterAxiosInstance.get("/get-theater-registration", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})

// Api for updating theater
export const updateTheaterApi = handleError(async (theaterId: string, updatedBody: object = {}) => {

    const result = await theaterAxiosInstance.patch(`/update-theater/${theaterId}`, updatedBody)
    return result.data

})