'use client'

import { useContext, useEffect, useId } from "react"
import Label from "./Label"
import { SubmitHandler, useForm } from "react-hook-form"
import FormInput from "./FormInput"
import {
    LockKeyhole as OtpIcon
} from 'lucide-react'
import { Button } from "../ui/button"
import BackButton from "./BackButton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { verifyOtpApi } from "@/api/auth"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import { ToastProvider } from "../context/ToastMessage"
import Spinner from "../ui/Spinner"

type Inputs = {
    otp: string
}

const OtpForm = () => {

    const otpId = useId()
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const { loading, user } = useAppSelector(state => state.auth)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const toastContext = useContext(ToastProvider)
 
    // Function for submitting form
    const submitOtpForm: SubmitHandler<Inputs> = async (data) => {

        if (user.email) {

            dispatch(authRequest())
            const result = await verifyOtpApi({ otp: parseInt(data.otp), email: user.email })

            if (result.success) {

                toastContext?.triggerToastMessage(result.message, "SUCCESS")
                dispatch(authSuccess({ user: null }))

            } else {

                toastContext?.triggerToastMessage(result.error, "ERROR")
                dispatch(authFailed({ errorMessage: result.error }))

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

        <form onSubmit={handleSubmit(submitOtpForm)} className="w-full flex flex-col gap-5 py-3 mt-10">
            {/* Input section */}
            <div className="w-full flex flex-col">
                <Label
                    labelTitle='OTP'
                    labelId={otpId}
                />
                <FormInput
                    id={otpId}
                    {...register("otp", {
                        required: true,
                        minLength: { value: 6, message: "OTP should be 6 digits" },
                        maxLength: { value: 6, message: "OTP should be 6 digits" }
                    })}
                    type='number'
                    placeholder='Enter OTP'
                    Icon={OtpIcon}
                    aria-invalid={formErrors.otp ? "true" : "false"}
                />
            </div>
            {/* Button section */}
            <div className="w-full flex flex-col gap-2">
                <Button
                    className="text-dark-foreground-color"
                    disabled={loading}
                >
                    {
                        loading
                            ?
                            <Spinner
                                color="black"
                                size={20}
                            />
                            :
                            <span>Verify</span>
                    }
                </Button>
                <BackButton
                    loading={loading}
                    navigationUrl="/verify-email"
                />
            </div>
        </form>

    )
}

export default OtpForm