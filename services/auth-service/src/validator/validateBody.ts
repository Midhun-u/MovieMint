import * as zod from 'zod'
import { emailRegex } from "../utils/emailRegex.js";

type FormType = "SIGN" | "LOGIN" | "GOOGLE_SIGN" | "GOOGLE_LOGIN"

// Function for validating body
export const validateBody = (type: FormType, body: object): { success: boolean, errorMessage?: string } => {

    try {

        if (type === "SIGN") {

            const obj = zod.object({
                firstname: zod.string().min(3).max(15).nonempty(),
                lastname: zod.string().min(1).max(10).nonempty(),
                email: zod.string().regex(emailRegex).nonempty(),
                password: zod.string().min(6).max(50),
                role: zod.string().nonempty()
            })

            obj.parse(body)

            return { success: true }

        } else if (type === "GOOGLE_SIGN") {

            const obj = zod.object({
                firstname: zod.string().min(3).max(15).nonempty(),
                lastname: zod.string().min(0).max(10).optional(),
                email: zod.string().regex(emailRegex).nonempty(),
                profilePic: zod.string(),
                role: zod.string().nonempty()
            })

            obj.parse(body)

            return { success: true }

        } else if (type === "LOGIN") {

            const obj = zod.object({
                email: zod.string().nonempty().regex(emailRegex),
                password: zod.string().min(6).max(50).nonempty(),
                adminKey: zod.string().nullable(),
                role: zod.string().nonempty()
            })

            obj.parse(body)

            return { success: true }

        } else if(type === "GOOGLE_LOGIN"){

            const obj = zod.object({
                email: zod.string().nonempty().regex(emailRegex),
                role: zod.string().nonempty()
            })

            obj.parse(body)
            
            return {success: true}

        }

        return { success: false }

    } catch (error: any) {

        const zodError = JSON.parse(error)

        return { success: false, errorMessage: zodError[0].message }

    }

}