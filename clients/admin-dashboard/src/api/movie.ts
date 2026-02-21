import { handleError } from "../utils/handleError";
import type { AddMovieData } from "../types/movie";
import { movieAxiosInstance } from "./axiosInstance";
import * as zod from 'zod'
import { youtubeEmbedUrlRegex } from "../utils/youtubeEmbedUrlRegex";

const authToken = localStorage.getItem("authToken")

// Api for adding movie
export const addMovieApi = handleError(async (data: AddMovieData) => {

    if(!authToken) return {success: false, errorMessage: "Unautherized Admin"}

    const validator = zod.object({
        title: zod.string().nonempty().min(3).max(50),
        subheading: zod.string().nonempty().min(5).max(100),
        synopsis: zod.string().nonempty().min(10).max(350),
        language: zod.string().nonempty().min(1).max(50),
        certificate: zod.string().nonempty(),
        categories: zod.array(zod.string()).min(1).max(5),
        formats: zod.array(zod.string()).min(1),
        releaseDate: zod.date(),
        trailer: zod.string().nonempty().regex(youtubeEmbedUrlRegex),
        duration: zod.object({
            hour: zod.number().min(1),
            minutes: zod.number().min(1),
            seconds: zod.number().min(0)
        }),
        type: zod.enum(["LIVE_ACTION", "ANIMATED"]),
        actors: zod.array(zod.object({name: zod.string(), id: zod.string()}))
    })

    const fields = validator.parse(data)

    const result = await movieAxiosInstance.post("/add-movie", {
        title: fields.title,
        subheading: fields.subheading,
        synopsis: fields.synopsis,
        language: fields.language,
        certificate: fields.certificate,
        categories: fields.categories,
        formats: fields.formats,
        releaseDate: fields.releaseDate,
        trailer: fields.trailer,
        duration: fields.duration,
        type: fields.type,
        actors: fields.actors.length? fields.actors: []
    }, {headers: {
        Authorization: `Bearer ${authToken}`
    }})

    return result.data

})

// Api for deleting movie
export const deleteMovieApi = handleError(async (movieId: string) => {

    const result = (await movieAxiosInstance.delete(`/delete-movie/${movieId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })).data
    return result

})

// Api for getting movies
export const getMoviesApi = handleError(async (
    page: number = 1, 
    limit: number = 10, 
    searchQuery: string = "", 
    categories: Array<string> = [], 
    formats: Array<string> = [], 
    language: string = ""
) => {

    const params = new URLSearchParams()

    categories.map((category) => {
        params.append("categories", category)
    })

    formats.map((format) => {
        params.append("formats", format)
    })

    const result = (await movieAxiosInstance.get(`/get-movies/?page=${page}&limit=${limit}&title=${searchQuery}&${params.toString()}&language=${language}`)).data
    return result

})

// Api for getting specific movie
export const getMovieApi = handleError(async (movieId: string) => {

    const result = (await movieAxiosInstance.get(`/get-movie/${movieId}`)).data
    return result

})

// Api for updating movie
export const updateMovieApi = handleError(async (movieId: string, data: object) => {

    const result = await movieAxiosInstance.patch(`/update-movie/${movieId}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return result.data

})

// Api for getting banner
export const getBannerApi = handleError(async (movieId: string) => {

    const result = (await movieAxiosInstance.get(`/get-banner/${movieId}`)).data
    return result

})

// Api for adding banner
export const addBannerApi = handleError(async (data: {movieId: string}) => {

    const result = await movieAxiosInstance.post("/add-banner", data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})

// Api for removing banner
export const removeBannerApi = handleError(async (id: string) => {

    const result = await movieAxiosInstance.delete(`/remove-banner/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })

    return result.data

})

// Api for getting total banner count
export const getTotalBannerCountApi = handleError(async () => {

    const result = await movieAxiosInstance.get("/get-banner-count")
    return result.data

})

// Api for getting all banners
export const getAllBannersApi = handleError(async () => {
  
  const result = (await movieAxiosInstance.get(`/get-all-banners/`)).data
  return result
  
})