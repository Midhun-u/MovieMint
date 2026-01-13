import FormLayout from "@/components/layout/FormLayout"
import { assets } from "@/public/assets/assets"

const VerifyEmailSection = () => {

  return (

    <FormLayout
      formType="EMAIL"
      vectorImage={assets.forgetPasswordVector}
      formTitle="Forgot Your Password ?"
      formAbout="No worries! Just enter your email and we’ll help you get back into your account in no time."
    />

  )
}

export default VerifyEmailSection