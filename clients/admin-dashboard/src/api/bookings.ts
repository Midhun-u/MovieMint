import { handleError } from "../utils/handleError";
import { bookingsAxiosInstance } from "./axiosInstance";

// Api for gettings logs
export const getLogsApi =  handleError(async () => {

    const result = await bookingsAxiosInstance.get('/get-logs')
    return result.data

})

// Api for getting bookings
export const getBookingsApi = handleError(async (page: number, limit: number, status: string = "") => {

    const result = await bookingsAxiosInstance.get(`/get-bookings/?page=${page}&limit=${limit}&status=${status}`)
    return result.data

})