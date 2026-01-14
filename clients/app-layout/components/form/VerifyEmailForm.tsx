'use client'

import {
  Mail as EmailIcon,
  ChevronLeft as BackIcon
} from 'lucide-react'
import Label from './Label'
import { useContext, useId, useState } from 'react'
import FormInput from './FormInput'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendOtpApi } from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import { ToastProvider } from '../context/ToastMessage'
import Spinner from '../ui/Spinner'

type Inputs = {
  email: string
}

const VerifyEmailForm = () => {

  const emailId = useId()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  const toastContext = useContext(ToastProvider)

  // Function for submitting email
  const submitEmail: SubmitHandler<Inputs> = async (data) => {

    dispatch(authRequest())
    const result = await sendOtpApi(data)

    if (result.success) {

      console.log(result)
      toastContext?.triggerToastMessage(result.message, "SUCCESS")
      dispatch(authSuccess({ user: null }))

    } else {

      toastContext?.triggerToastMessage(result.error, "ERROR")
      dispatch(authFailed({ errorMessage: result.error }))

    }

  }

  return (

    <form onSubmit={handleSubmit(submitEmail)} className="w-full flex flex-col gap-5 py-3 mt-10">
      {/* Input section */}
      <div className="w-full flex flex-col">
        <Label
          labelTitle='Email Address'
          labelId={emailId}
        />
        <FormInput
          {...register("email", {
            required: true
          })}
          type='email'
          placeholder='Enter your email address'
          Icon={EmailIcon}
          aria-invalid={formErrors.email ? "true" : "false"}
        />
      </div>
      {/* Button section */}
      <div className='w-full flex flex-col gap-2'>
        <Button
          className='text-dark-foreground-color'
          disabled={loading}
        >
          {
            loading
              ?
              <Spinner
                size={20}
                color='black'
              />
              :
              <span>Send OTP</span>
          }
        </Button>
        <Button
          type='button'
          className='bg-foreground-color border-2 border-disable-color/10 text-dark-foreground-color'
          onClick={() => router.push("/login")}
          disabled={loading}
        >
          <BackIcon
            className='stroke-dark-foreground-color'
            size={20}
          />
          <span>Back</span>
        </Button>
      </div>
    </form>

  )
}

export default VerifyEmailForm