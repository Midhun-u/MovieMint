'use client'

import Spinner from "@/components/ui/Spinner"
import { useAppSelector } from "@/store/hooks"

const LoadingUI = () => {

    const { theme } = useAppSelector(state => state.theme)

    return (

        <div className="w-full">
            <Spinner
                size={25}
                color={theme === "dark"? "white": "black"}
            />
        </div>

    )

}

export default LoadingUI