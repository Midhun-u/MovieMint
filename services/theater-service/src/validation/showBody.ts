import * as zod from 'zod'
import { ShowBody } from '../types/showBody'

// Function for validating show body
export const validateShowBody = (body: Omit<ShowBody, "status">): { success: boolean, fields?: Omit<ShowBody, "status">, error?: string } => {

    try {

        const showBodyObject = zod.object({
            movieId: zod.string().nonempty(),
            theaterId: zod.string().nonempty(),
            price: zod.number().min(1).nonnegative().nonoptional(),
            hour: zod.number().min(1).nonnegative().nonoptional(),
            minutes: zod.number().nonnegative().nonnegative(),
            day: zod.number().nonnegative().nonoptional()
        })

        const fields = showBodyObject.parse(body)

        return { success: true, fields }

    } catch (error) {
        return { success: false, error: "Invalid fields" }
    }

}