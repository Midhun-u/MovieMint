import { handleError } from "../utils/handleError";
import { theaterAxiosInstance } from "./axiosInstance";

// Api for getting theater request
export const getTheaterRequestsApi = handleError(async (page: number = 0, limit: number = 0, date: Date | null) => {

    const result = (await theaterAxiosInstance.get(`/get-theater-requests/?page=${page}&limit=${limit}${date? `&date=${date}`: ""}`)).data
    return result

})