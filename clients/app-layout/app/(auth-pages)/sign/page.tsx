import Form from '@/components/form/Form'
import { assets } from '@/public/assets/assets'
import Image from 'next/image'

const SignPage = () => {

  return (

    <section className='w-full h-svh flex gap-2 justify-center md:p-5'>
      {/* Image section */}
      <div className='hidden md:flex justify-center px-10 items-center w-full h-full'>
        <Image
          src={assets.signVector}
          alt='sign-vector-image'
          className='w-auto h-auto aspect-auto'
          loading='eager'
        />
      </div>
      {/* Form section */}
      <div className='flex flex-col w-full px-5 sm:w-[70%] md:w-full items-center py-10 h-full'>
        {/* Heading section */}
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-lg'>Sign In</h1>
          <p className='text-sm w-full md:w-[70%] text-center'>Please sign in to securely access your account, manage your data, and continue using the platform.</p>
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