import { handleError } from "../utils/handleError";
import { theaterShowAxiosInstance } from "./axiosInstance";

const authToken = localStorage.getItem("authToken")

// Api for creating show
export const createShowApi = handleError(async (data: {
  theaterId: string,
  movieId: string,
  price: number,
  hour: number,
  minutes: number,
  startDay: number
}) => {

  const result = await theaterShowAxiosInstance.post("/add-show", data, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })

  return result.data

})

// Api for getting shows
export const getShowsApi = handleError(async (theaterId: string, page: number, limit: number, status: string = "") => {

  const result = await theaterShowAxiosInstance.get(`/get-shows/${theaterId}/?page=${page}&limit=${limit}&status=${status}`)
  return result.data

})

// Api for getting specific show
export const getShowApi = handleError(async (showId: string) => {

  const result = await theaterShowAxiosInstance.get(`/get-show/${showId}`)
  return result.data

})

// Api for updating show
export const updateShowApi = handleError(async (showId: string, updatedBody: object = {}) => {

    const result = await theaterShowAxiosInstance.patch(`/update-show/${showId}`, updatedBody, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })

    return result.data

})