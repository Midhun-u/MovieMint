import * as zod from 'zod'
import type { CheckoutBody } from '../types/checkoutBody.js'

// Function for validating checkout body
export const checkoutValidator = (body: CheckoutBody) => {

    try {

        const validator = zod.object({
            movieId: zod.string().nonempty().max(50).trim(),
            userId: zod.string().nonempty().trim(),
            showId: zod.string().nonempty().trim(),
            amount: zod.number().min(1).nonnegative().nonoptional()
        })

        const fields = validator.parse(body)
        return {success: true, fields}

    } catch (error: any) {

        console.log(error)
        const zodError = JSON.parse(error)
        return { success: false, errorMessage: zodError[0].message }

    }

}