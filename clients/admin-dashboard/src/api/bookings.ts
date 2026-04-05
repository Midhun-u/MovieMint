import { handleError } from "../utils/handleError";
import { bookingsAxiosInstance } from "./axiosInstance";

// Api for gettings logs
export const getLogsApi =  handleError(async () => {

    const result = await bookingsAxiosInstance.get('/get-logs')
    return result.data

})