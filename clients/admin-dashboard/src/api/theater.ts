import { handleError } from "../utils/handleError";
import { theaterAxiosInstance } from "./axiosInstance";

const authToken = localStorage.getItem('authToken') || ""

// Api for getting theater request
export const getTheaterRequestsApi = handleError(async (page: number = 0, limit: number = 0) => {

    const result = (await theaterAxiosInstance.get(`/get-theater-requests/?page=${page}&limit=${limit}`)).data
    return result

})

//Api for approving theater
export const approveTheaterApi = handleError(async (theaterId: string) => {

    const result = (await theaterAxiosInstance.patch(`/approve-theater/${theaterId}`)).data
    return result

})

// Api for deleting theater
export const deleteTheaterApi = handleError(async (theaterId: string) => {

    const result = (await theaterAxiosInstance.delete(`/delete-theater/${theaterId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })).data
    return result

})

// Api for getting theater details
export const getTheaterDetailsApi = handleError(async (theaterId: string) => {

    const result = (await theaterAxiosInstance.get(`/get-theater/${theaterId}`)).data
    return result

})

// Api for getting dashboard logs
export const getTheaterDashboardLogs = handleError(async () => {
  
  const result = await theaterAxiosInstance.get("/get-dashboard-logs", {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }) 
  
  return result.data
  
})