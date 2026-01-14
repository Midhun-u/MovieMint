'use client'

import {
  Mail as EmailIcon,
  ChevronLeft as BackIcon
} from 'lucide-react'
import Label from './Label'
import { useId, useState } from 'react'
import FormInput from './FormInput'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import {SubmitHandler, useForm} from 'react-hook-form'
import { sendOtpApi } from '@/api/auth'

type Inputs = {
  email: string
}

const VerifyEmailForm = () => {

  const emailId = useId()
  const router = useRouter()
  const {register, handleSubmit, formState: {errors: formErrors}} = useForm<Inputs>()

  // Function for submitting email
  const submitEmail: SubmitHandler<Inputs> = async (data) => {

    const result = await sendOtpApi(data)
    console.log(result)

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
        />
      </div>
      {/* Button section */}
      <div className='w-full flex flex-col gap-2'>
        <Button
          className='text-dark-foreground-color'
        >
            <span>Send OTP</span>
        </Button>
        <Button
          type='button'
          className='bg-foreground-color border-2 border-disable-color/10 text-dark-foreground-color'
          onClick={() => router.push("/login")}
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