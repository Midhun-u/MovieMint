import Image from 'next/image'
import Form from '../form/Form'
import { assets } from '@/public/assets/assets'
import { FormType } from '@/types/formType'

interface AuthPageProps {
    formType: FormType
}

const AuthPage = ({ formType }: AuthPageProps) => {

    return (

        <section className='w-full h-svh flex gap-2 justify-center md:p-5'>
            {/* Image section */}
            <div className='hidden md:flex justify-center px-10 items-center w-full h-full'>
                <Image
                    src={formType === "LOGIN" ? assets.loginVector : assets.signVector}
                    alt='sign-vector-image'
                    className='w-[80%] h-[80%] aspect-auto'
                    loading='eager'
                />
            </div>
            {/* Form section */}
            <div className='flex flex-col w-full px-5 sm:w-[70%] md:w-full items-center py-10 h-full'>
                {/* Heading section */}
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-lg'>
                        {
                            formType === "LOGIN"
                                ?
                                <>Login</>
                                :
                                <>Sign IN</>
                        }
                    </h1>
                    <p className='text-sm w-full md:w-[70%] text-center'>
                        {
                            formType === "LOGIN"
                                ?
                                <>
                                    Welcome back! Enter your login details to continue and enjoy a seamless experience.
                                </>
                                :
                                <>
                                    Please sign in to securely access your account, manage your data, and continue using the platform.
                                </>
                        }
                    </p>
                </div>
                {/* Form */}
                <Form
                    formType={formType}
                />
            </div>
        </section>

    )
}

export default AuthPage