'use client'

import FormLayout from "./FormLayout"
import { assets } from "@/public/assets/assets"
import { useAppSelector } from "@/store/hooks"

const ResetPasswordLayout = () => {

  const {verified} = useAppSelector(state => state.otp)
  console.log(verified)

  return (

    !verified
      ?

      <>
        <FormLayout
          vectorImage={assets.otpVector}
          formType="OTP"
          formTitle="Enter OTP"
          formAbout="We have sent an OTP to your email. Enter that OTP to verify your account and continue. Don't refresh the page"
        />
      </>
      :

      <>
        <FormLayout
          vectorImage={assets.passwordVector}
          formType="RESET_PASSWORD"
          formTitle="Reset Password"
          formAbout="Enter a new password below to reset your account credentials and regain access. Don't refresh the page"
        />
      </>

  )
}

export default ResetPasswordLayout