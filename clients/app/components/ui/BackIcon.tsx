'use client'

import {
    ArrowLeft as BackIcon
} from 'lucide-react'

const BackIconUI = () => {

    return (
        <div
            onClick={() => console.log("Clicked")}
            className={"container"}
        >
            <BackIcon
                strokeWidth={1.8}
                size={25}
            />
        </div>
    )

}

export default BackIconUI