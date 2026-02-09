import { handleError } from "../utils/handleError";
import { authAxiosInstance } from "./axiosInstance";

// Api for getting theater owner
export const getTheaterOwnerApi = handleError(async (authToken: string) => {

    const result = await authAxiosInstance.get("/auth-profile", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})