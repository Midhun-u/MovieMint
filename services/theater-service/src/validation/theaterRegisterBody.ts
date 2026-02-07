import { TheaterBody } from "../types/theaterBody";
import * as zod from 'zod'

// Function for validating theater request body
export const validateTheaterRegisterBody = (body: TheaterBody): {success: boolean, fields?: TheaterBody, error?: string} => {

    try {
        
        const theaterRequestFields = zod.object({
            theaterName: zod.string().min(3).max(25).nonempty().trim(),
            theaterLocation: zod.string().min(5).max(100).nonempty().trim(),
            formats: zod.array(zod.string()).min(2),
            layoutNumber: zod.number().min(1).max(3),
            setsNumber: zod.number().min(1).max(4),
            rowsNumber: zod.number().min(1).max(5),
            seatsNumber: zod.number().min(1).max(7),
            allowCancellation: zod.boolean()
        })

        const fields = theaterRequestFields.parse(body)

        return {success: true, fields}

    } catch (error) {
        return {success: false, error: "Invalid fields"}
    }

}