"use server"

import { handleError } from "@/utils/handleError";
import { authInstance } from "./axiosInstance";
import { FormInputData } from "@/types/formInputData";
import * as zod from 'zod'
import { emailRegex } from "@/utils/emailRegex";

// Api for signing
export const signApi = handleError(async(formInputData: FormInputData) => {

    const formInputDataObject = zod.object({
        firstname: zod.string().nonempty().min(3).max(50),
        lastname: zod.string().nonempty().min(1).max(50),
        email: zod.string().nonempty().regex(emailRegex).max(255),
        password: zod.string().nonempty().min(6).max(20)
    })

    console.log(formInputDataObject.parse(formInputData))

    const result = (await authInstance.post("/sign", {
        firstname: formInputData.firstname,
        lastname: formInputData.lastname,
        email: formInputData.email,
        password: formInputData.password
    })).data

    console.log(result)

})