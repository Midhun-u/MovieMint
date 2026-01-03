import Form from '@/components/form/Form'
import { assets } from '@/public/assets/assets'
import Image from 'next/image'

const SignPage = () => {

  return (

    <section className='w-full h-svh flex gap-2 justify-center md:p-5'>
      {/* Image section */}
      <div className='flex justify-center items-center w-full h-full'>
        <Image
          src={assets.signVector}
          alt='sign-vector-image'
          width={350}
          height={350}

        />
      </div>
      {/* Form section */}
      <div className='flex flex-col items-center py-10 w-full h-full'>
        {/* Heading section */}
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-lg'>Sign In</h1>
          <p className='text-sm'>Please sign in to securely access your account, manage your data, and continue using the platform.</p>
        </div>
        {/* Form */}
        <Form 
          formType='SIGN'
        />
      </div>
    </section>

  )
}

export default SignPage