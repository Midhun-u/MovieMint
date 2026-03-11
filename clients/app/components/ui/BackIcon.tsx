'use client'

import {
    ArrowLeft as BackIcon
} from 'lucide-react'

const BackIconUI = () => {

    return (
        <div
            onClick={() => console.log("Clicked")}
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