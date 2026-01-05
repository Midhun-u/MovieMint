import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL

// Authentication instance
export const authInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})