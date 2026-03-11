import { assets } from '../.../../../public/assets/assets'
import {Button} from './button'
import Image from 'next/image'

const NoResult = () => {

    return (

        <div className="flex justify-center items-center flex-col min-h-[60vh] w-full mt-5">
            <Image
                src={assets.noResult}
                className="w-75 h-auto"
                alt='No result image max-[400px]:w-[90%]'
            />
            <p className='text-foreground-theme-color/50 mt-3.75 text-center'>
                No items found.
                We couldn&apos;t find any items matching your current view. Try Again
            </p>
            <Button
                className="mt-5 max-[500px]:w-full w-50"
            >
                <>Refresh Page</>
            </Button>
        </div>

    )
}

export default NoResult