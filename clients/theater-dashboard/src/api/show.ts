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