import axios from "axios"
import { envVariables } from "../utils/envVariables"

// URLS
const AUTH_BASE_URL = envVariables.AUTH_URL
const MOVIE_BASE_URL = envVariables.MOVIE_URL
const MEDIA_BASE_URL = envVariables.MEDIA_URL
const THEATER_BASE_URL = envVariables.THEATER_URL

// Auth instance
export const authAxiosInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
})

// Movie instance
export const movieAxiosInstance = axios.create({
    baseURL: MOVIE_BASE_URL,
    withCredentials: true,
})

// Media instance
export const mediaAxiosInstance = axios.create({
    baseURL: MEDIA_BASE_URL,
    withCredentials: true
})

// Theater instance
export const theaterAxiosInstance = axios.create({
    baseURL: THEATER_BASE_URL,
    withCredentials: true
})