import { envVariables } from "../utils/envVariables.js";
import { fetchInstance } from "./fetch.js";

const UPLOAD_IMAGE_BASE_URL = envVariables.UPLOAD_IMAGE_BASE_URL

// Function for uploading user profile pic
export const uploadUserProfile = async (data: object) => {

    const result = await fetchInstance(UPLOAD_IMAGE_BASE_URL, "POST", "/upload", data)
    return result
}