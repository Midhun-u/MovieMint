import { handleError } from "../utils/handleError";
import { authAxiosInstance } from "./axiosInstance";

// Api for getting admin profile
export const getAdminProfile = handleError(async ( ) => {

    const result = await authAxiosInstance.get("/auth-profile")

    return result.data

})