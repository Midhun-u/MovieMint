import axios from "axios"
import { envVariables } from "../utils/envVariables"

const AUTH_BASE_URL = envVariables.AUTH_URL

export const authAxiosInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
})