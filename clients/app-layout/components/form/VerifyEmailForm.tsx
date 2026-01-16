'use client'

import {
  Mail as EmailIcon,
} from 'lucide-react'
import { useContext, useId } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendOtpApi } from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import { ToastProvider } from '../context/ToastMessage'
import OneInputFieldForm from './OneInputFieldForm'

type Inputs = {
  email: string
}

const VerifyEmailForm = () => {

  const emailId = useId()
  const router = useRouter()
  const { register, formState: { errors: formErrors } } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  const toastContext = useContext(ToastProvider)

  // Function for submitting email
  const submitEmail: SubmitHandler<Inputs> = async (data) => {

    dispatch(authRequest())
    const result = await sendOtpApi(data)

    if (result.success) {

      toastContext?.triggerToastMessage(result.message, "SUCCESS")
      dispatch(authSuccess({ user: {email: result.email} }))

      router.push("/reset-password")

    } else {

      toastContext?.triggerToastMessage(result.error, "ERROR")
      dispatch(authFailed({ errorMessage: result.error }))

    }

  }

  return (

    <OneInputFieldForm
      id={emailId}
      inputFieldType='email'
      labelText='Email'
      placeholder='Enter your email'
      primaryButtonTitle='Verify'
      loading={loading}
      backNavigationUrl='/login'
      ariaInvalid={formErrors.email? "true": "false"}
      Icon={EmailIcon}
      formSubmitFunction={submitEmail}
      {...register("email", {
        required: true
      })}
    />

  )
}

export default VerifyEmailForm