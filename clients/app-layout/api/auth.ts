"use server"

import { handleError } from "@/utils/handleError";
import { GoogleSignData, SignFormInputData } from "@/types/formInputData";
import * as zod from 'zod'
import { emailRegex } from "@/utils/emailRegex";
import { fetchInstance } from "./fetch";
import { envVariables } from "@/utils/envVariables";

const AUTH_BASE_URL = envVariables.AUTH_URL

// Api for signing
export const signApi = handleError(async (formInputData: SignFormInputData) => {

    const formInputDataObject = zod.object({
        firstname: zod.string().nonempty().min(3).max(15),
        lastname: zod.string().nonempty().min(1).max(10),
        email: zod.string().nonempty().regex(emailRegex),
        password: zod.string().nonempty().min(6).max(50),
        role: zod.string(),
        adminKey: zod.string().nullable()
    })

    const fields = formInputDataObject.parse(formInputData)

    if (fields) {

        const data = await fetchInstance(AUTH_BASE_URL, "/sign", "POST", {
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

// Api for google signing
export const googleSignApi = handleError(async (signData: GoogleSignData) => {

    if(!signData) return null

    const signDataObj = zod.object({
        firstname: zod.string().trim().nonempty().min(3).max(15),
        lastname: zod.string().trim().nonempty().min(1).max(10),
        email: zod.string().trim().nonempty().regex(emailRegex),
        profilePic: zod.string(),
        role: zod.string(),
    })

    const fields = signDataObj.parse(signData)


    const data = await fetchInstance(AUTH_BASE_URL, "/google-sign", "POST", {
        firstname: fields.firstname.trim(),
        lastname: fields.lastname.trim(),
        email: fields.email.trim(),
        profilePic: fields.profilePic,
        role: fields.role
    })

    return data

})