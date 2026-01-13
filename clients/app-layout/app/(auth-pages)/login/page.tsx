import FormLayout from "@/components/layout/FormLayout"
import { assets } from "@/public/assets/assets"

const LoginPage = () => {

    return (

        <FormLayout
            formType="LOGIN"
            vectorImage={assets.loginVector}
            formTitle="Login"
            formAbout="Welcome back! Enter your login details to continue and enjoy a seamless experience."
        />

    )
}

export default LoginPage