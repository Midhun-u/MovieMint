'use client'

import {
    ChevronLeft as BackIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackIconUI = () => {

    const router = useRouter()

    return (
        <div
            onClick={() => router.back()}
            className="self-start rounded-full w-7.5 h-7 flex justify-center items-center cursor-pointer text-foreground-theme-color/50 hover:bg-foreground-color"
        >
            <BackIcon
                strokeWidth={1.8}
                size={25}
            />
        </div>
    )

}

export default BackIconUI