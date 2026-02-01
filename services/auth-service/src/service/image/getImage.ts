import { envVariables } from "../../utils/envVariables.js"
import { fetchInstance } from "../fetch.js"

const UPLOAD_IMAGE_BASE_URL = envVariables.UPLOAD_IMAGE_BASE_URL

// Function for fetching user profile pic
export const getUserProfileImage = async (userId: string) => {

    const result = await fetchInstance(UPLOAD_IMAGE_BASE_URL, "GET", `/get-image/${userId}`)
    return result

}