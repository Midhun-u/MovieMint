"use server"

import { handleError } from "@/utils/handleError";
import { GoogleLoginData, GoogleSignData, LoginFormInputData, SignFormInputData } from "@/types/formInputData";
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
            firstname: fields.firstname.trim(),
            lastname: fields.lastname.trim(),
            email: fields.email.trim(),
            password: fields.password.trim(),
            role: fields.role,
            adminKey: fields.adminKey?.trim()
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

// Api for login
export const loginApi = handleError(async (formInputData: LoginFormInputData) => {

    const formInputDataObject = zod.object({
       email: zod.string().regex(emailRegex).nonempty(),
       password: zod.string().min(6).max(50).nonempty(),
       adminKey: zod.string().nullable(),
       role: zod.string().nonempty()
    })

    const fields = formInputDataObject.parse(formInputData)

    if(fields){

        const data = await fetchInstance(AUTH_BASE_URL, "/login", "POST", {
            email: fields.email.trim(),
            password: fields.password.trim(),
            adminKey: fields.adminKey?.trim(),
            role: formInputData.role
        })

        return data

    }

})

// Api for google login
export const googleLoginApi = handleError(async (formInputData: GoogleLoginData) => {

    const formInputDataObject = zod.object({
        email: zod.string().nonempty().regex(emailRegex)
    })

    const fields = formInputDataObject.parse(formInputData)

    const data = await fetchInstance(AUTH_BASE_URL, "/google-login", "POST", {
        email: fields.email.trim()
    })

    return data

})

// Api for sending OTP
export const sendOtpApi = handleError(async (formInputData: {email: string}) => {

    const formInputDataObject = zod.object({
        email: zod.string().regex(emailRegex)
    })

    const fields = formInputDataObject.parse(formInputData)

    const result = await fetchInstance(AUTH_BASE_URL, "/send-otp", "POST", {
        email: fields.email
    })

    return result

})

// Api for verifying OTP
export const verifyOtpApi = handleError(async (formInputData: {otp: number, email: string}) => {

    const formInputDataObject = zod.object({
        otp: zod.number().nonoptional(),
        email: zod.string().regex(emailRegex)
    })

    const fields = formInputDataObject.parse(formInputData)

    const result = fetchInstance(AUTH_BASE_URL, "/verify-otp", "POST", {
        otp: fields.otp,
        email: fields.email
    })

    return result

})

// Api for resetting password
export const resetPasswordApi = handleError(async (formInputData: {newPassword: string, userId: string} ) => {

    const formInputDataObject = zod.object({
        newPassword: zod.string().min(6).max(50),
        userId: zod.string().nonempty()
    })

    const fields = formInputDataObject.parse(formInputData)

    const result = await fetchInstance(AUTH_BASE_URL, "/reset-password", "PUT", {
        newPassword: fields.newPassword,
        userId: fields.userId
    })

    return result

})