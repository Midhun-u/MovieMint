import { handleError } from "../utils/handleError";
import { bookingsAxiosInstance } from "./axiosInstance";

// Api for getting logs
export const getLogsApi = handleError(async () => {

    const result = await bookingsAxiosInstance.get('/get-logs')
    return result.data

})

// Api for getting theater bookings
export const getTheaterBookingsApi = handleError(async (page: number, limit: number, status: string) => {

    const result = await bookingsAxiosInstance.get(`/get-theater-bookings/?page=${page}&limit=${limit}&status=${status}`)
    return result.data

})