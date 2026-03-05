import { handleError } from "../utils/handleError";
import { mediaAxiosInstance } from "./axiosInstance";

const authToken = localStorage.getItem("authToken")

// Api for updating theater image
export const updateTheaterImage = handleError(async (file: File, theaterId: string) => {
    
    const formData = new FormData()
    formData.append("file", file)

    const result = await mediaAxiosInstance.patch(`/theater/update-image/${theaterId}`, formData, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})