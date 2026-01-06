import axios from 'axios'

const BASE_URL = process.env.AUTH_URL

// Authentication instance
export const authInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})