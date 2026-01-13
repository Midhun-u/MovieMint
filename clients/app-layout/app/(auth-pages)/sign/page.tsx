import FormLayout from '@/components/layout/FormLayout'
import { assets } from '@/public/assets/assets'

const SignPage = () => {

  return (

    <FormLayout
      formType='SIGN'
      vectorImage={assets.signVector}
      formTitle='Sign In'
      formAbout='Please sign in to securely access your account, manage your data, and continue using the platform.'
    />

  )
}

export default SignPage