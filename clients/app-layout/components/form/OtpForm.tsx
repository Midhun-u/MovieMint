'use client'

import { useContext, useEffect, useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {
    LockKeyhole as OtpIcon
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { verifyOtpApi } from "@/api/auth"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import { ToastProvider } from "../context/ToastMessage"
import AccountRecoveryForm from "./AccountRecoveryForm"
import { otpFailed, otpRequest, otpSuccess } from "@/store/otpSlice"

type Inputs = {
    otp: string
}

const OtpForm = () => {

    const otpId = useId()
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const { user } = useAppSelector(state => state.auth)
    const {loading} = useAppSelector(state => state.otp)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const toastContext = useContext(ToastProvider)

    // Function for submitting form
    const submitOtpForm: SubmitHandler<Inputs> = async (data) => {

        if (user.email) {

            dispatch(otpRequest())
            const result = await verifyOtpApi({ otp: parseInt(data.otp), email: user.email })

            if (result.success) {

                toastContext?.triggerToastMessage(result.message, "SUCCESS")

                dispatch(authSuccess({ user: result.user }))
                dispatch(otpSuccess())

            } else {

                toastContext?.triggerToastMessage(result.error, "ERROR")
                dispatch(otpFailed({ errorMessage: result.error }))

            }

        } else {
            router.push("/verify-email")
        }


    }

    useEffect(() => {

        if (!user.email) {

            router.push('/verify-email')
            return

        }

    }, [])

    return (

        <AccountRecoveryForm
            id={otpId}
            inputFieldType="number"
            inputFieldName="otp"
            Icon={OtpIcon}
            placeholder="Enter OTP"
            loading={loading}
            labelText="OTP"
            backNavigationUrl="/verify-email"
            primaryButtonTitle="Verify"
            handleSubmit={handleSubmit}
            formSubmitFunction={submitOtpForm}
            register={register}
            ariaInvalid={formErrors.otp? "true": "false"}
            rules={{required: true, minLength: {value: 6, message: "Digits should be 6 letters"}, maxLength: {value: 6, message: "Digits should be 6 letters"}}}
        />

    )
}

export default OtpForm