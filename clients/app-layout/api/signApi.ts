"use server"

import { handleError } from "@/utils/handleError";
import { FormInputData } from "@/types/formInputData";
import * as zod from 'zod'
import { emailRegex } from "@/utils/emailRegex";
import { auth } from "./fetch";

// Api for signing
export const signApi = handleError(async(formInputData: FormInputData) => {

    const formInputDataObject = zod.object({
        firstname: zod.string().nonempty().min(3).max(15),
        lastname: zod.string().nonempty().min(1).max(10),
        email: zod.string().nonempty().regex(emailRegex),
        password: zod.string().nonempty().min(6).max(50),
        role: zod.string(),
        adminKey: zod.string().nullable()
    })

    const fields = formInputDataObject.parse(formInputData)

    if(fields){

        const data = await auth("POST", "/sign", {
            firstname: fields.firstname,
            lastname: fields.lastname,
            email: fields.email,
            password: fields.password,
            role: fields.role,
            adminKey: fields.adminKey
        })

        return data

    }


})