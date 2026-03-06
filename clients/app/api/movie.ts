'use server'

import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";
import { envVariables } from "@/utils/envVariables";

const MOVIE_BASE_URL = envVariables.MOVIE_URL

// Api for getting banners
export const getBannersApi = handleError(async () => {

    const result = await fetchInstance(MOVIE_BASE_URL, "/get-all-banners", "GET", {}, "json")
    return result

})