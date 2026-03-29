import type { BookingsBody } from "../types/bookingsBody.js"
import * as zod from 'zod'

// Function for validating bookings body
export const bookingsBodyValidator = (body: BookingsBody) => {

    try {

        const validator = zod.object({
            showId: zod.string().nonempty().trim(),
            theaterId: zod.string().nonempty().trim(),
            bookedSeats: zod.array(zod.object({
                layoutNumber: zod.number().min(1),
                rowNumber: zod.number().min(1),
                seatNumber: zod.number().min(1),
                setNumber: zod.number().min(1)
            })),
            movieId: zod.string().trim()
        })

        const fields = validator.parse(body)
        return {success: true, fields}

    } catch (error: any) {
        console.log(error)
        const zodError = JSON.parse(error)
        return { success: false, errorMessage: zodError[0].message }
    }

}