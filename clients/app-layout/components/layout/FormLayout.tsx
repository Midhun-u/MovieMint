import Form from '../form/Form'
import Image, { StaticImageData } from 'next/image'

type FormType = "LOGIN" | "SIGN" | "OTP" | "EMAIL" | "RESET PASSWORD"

interface FormLayoutProps {
    formType: FormType
    vectorImage: StaticImageData | string
    formTitle: string
    formAbout: string
}

const FormLayout = ({ formType, vectorImage, formTitle, formAbout }: FormLayoutProps) => {

    return (

        <section className='w-full h-svh flex gap-2 justify-center md:p-5'>
            {/* Image section */}
            <div className='hidden md:flex justify-center px-10 items-center w-full h-full'>
                <Image
                    src={vectorImage}
                    alt={`${formType} vector image`}
                    className='w-120 h-120 aspect-auto'
                    loading='eager'
                />
            </div>
            {/* Form section */}
            <div className='flex flex-col w-full px-3 sm:px-5 sm:w-[70%] md:w-full items-center py-10 h-full'>
                {/* Heading section */}
                <div className='flex flex-col items-center'>
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
                    <Form
                        formType={formType}
                    />
                    :
                    null
                }
            </div>
        </section>

    )
}

export default FormLayout