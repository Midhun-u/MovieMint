import { handleError } from "@/utils/handleError";
import { movieAxiosInstance } from "./axiosInstance";
import type { AddMovieData } from "@/types/AddMovieData";

// Api for adding movie
export const addMovieApi = handleError(async (data: AddMovieData) => {

    const result = await movieAxiosInstance.post("/add-movie", )

})