import AuthForm from '../form/AuthForm'
import Image, { StaticImageData } from 'next/image'
import VerifyEmailForm from '../form/VerifyEmailForm'

type FormType = "LOGIN" | "SIGN" |  "EMAIL" 

interface FormLayoutProps {
    formType: FormType
    vectorImage: StaticImageData | string
    formTitle: string
    formAbout: string
}

const FormLayout = ({ formType, vectorImage, formTitle, formAbout }: FormLayoutProps) => {

    return (

        <section className='w-full h-full flex gap-2 justify-center md:p-5'>
            {/* Image section */}
            <div className='hidden md:flex justify-center px-10 items-center w-full h-svh'>
                <Image
                    src={vectorImage}
                    alt={`${formType} vector image`}
                    className='w-120 h-120 aspect-auto'
                    loading='eager'
                />
            </div>
            {/* Form section */}
            <div className='flex justify-center flex-col w-full px-3 sm:px-5 sm:w-[70%] md:w-full items-center py-10'>
                {/* Heading section */}
                <div className='flex justify-center flex-col items-center'>
                    <h1 className='font-bold text-lg'>
                        {formTitle}
                    </h1>
                    <p className='text-sm w-full md:w-[70%] text-center'>
                        {formAbout}
                    </p>
                </div>
                {/* Form */}
                {
                    formType === "LOGIN" || formType === "SIGN"
                    ?
                    <AuthForm
                        formType={formType}
                    />
                    :
                    null
                }
                {
                    formType === "EMAIL"
                    ?
                    <VerifyEmailForm
                    />
                    :
                    null
                }
            </div>
        </section>

    )
}

export default FormLayout