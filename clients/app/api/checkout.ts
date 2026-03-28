'use server'

import { envVariables } from "@/utils/envVariables";
import { handleError } from "@/utils/handleError";
import { fetchInstance } from "./fetch";

const CHECKOUT_BASE_URL = envVariables.CHECKOUT_URL

// Api for creating checkout session
export const createCheckoutSession = handleError(async (body: {movieId: string, userId: string, showId: string, amount: number}) => {

    const result = await fetchInstance(CHECKOUT_BASE_URL, `/create-payment-intent`, "POST", body, "json")
    return result

})