import axios from "axios"
import { envVariables } from "../utils/envVariables"

// URLS
const AUTH_BASE_URL = envVariables.AUTH_URL
const MOVIE_BASE_URL = envVariables.MOVIE_URL
const MEDIA_BASE_URL = envVariables.MEDIA_URL
const THEATER_BASE_URL = envVariables.THEATER_URL
const BOOKING_BASE_URL = envVariables.BOOKINGS_BASE_URL

// Auth instance
export const authAxiosInstance = axios.create({
    baseURL: AUTH_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
})

// Movie instance
export const movieAxiosInstance = axios.create({
    baseURL: MOVIE_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
})

// Media instance
export const mediaAxiosInstance = axios.create({
    baseURL: MEDIA_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
})

// Theater instance
export const theaterAxiosInstance = axios.create({
    baseURL: THEATER_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
})

export const bookingsAxiosInstance = axios.create({
    baseURL: BOOKING_BASE_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
})