'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import AccountRecoveryForm from "./AccountRecoveryForm"
import { useContext, useId } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { resetPasswordApi } from "@/api/auth"
import { ToastProvider } from "../context/ToastMessage"
import { authRequest } from "@/store/authSlice"

type Inputs = {
    newPassword: string
}

const ResetPasswordForm = () => {

    const {register, handleSubmit, formState: {errors: formErrors}} = useForm<Inputs>()
    const passwordId = useId()
    const {loading, user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const toastContext = useContext(ToastProvider)

    // Function for resetting user password
    const handleResetPassword: SubmitHandler<Inputs> = async (data) => {
       
        if(user.id){

            dispatch(authRequest())
            const result = await resetPasswordApi({newPassword: data.newPassword, userId: user.id})
            console.log(result)
            
            // if(result.success){

            // }else{
            //     toastContext?.triggerToastMessage(result.error, "ERROR")

            // }

        }else{
            router.push("/verify-email")
        }

    }

  return (

    <AccountRecoveryForm
        id={passwordId}
        inputFieldName="newPassword"
        inputFieldType="password"
        labelText="New Password"
        primaryButtonTitle="Change Password"
        backNavigationUrl="/verify-email"
        placeholder="Enter new password"
        formSubmitFunction={handleResetPassword}
        handleSubmit={handleSubmit}
        loading={loading}
        register={register}
        rules={{required: true, minLength: 6, maxLength: 50}}
        ariaInvalid={formErrors.newPassword? "true": "false"}
    />

  )
}

export default ResetPasswordForm