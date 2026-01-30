import axios from "axios"
import { envVariables } from "../utils/envVariables"

// URLS
const AUTH_BASE_URL = envVariables.AUTH_URL
const MOVIE_BASE_URL = envVariables.MOVIE_URL

// Auth instance
export const authAxiosInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
})

export const movieAxiosInstance = axios.create({
    baseURL: MOVIE_BASE_URL,
    withCredentials: true,
})