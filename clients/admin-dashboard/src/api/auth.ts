import { handleError } from "../utils/handleError";
import { authAxiosInstance } from "./axiosInstance";

// Api for getting admin profile
export const getAdminProfile = handleError(async (authToken: string ) => {

    const result = await authAxiosInstance.get("/auth-profile", {
        headers: {
            Authorization: authToken? `Bearer ${authToken}`: ""
        }
    })

    return result.data

})