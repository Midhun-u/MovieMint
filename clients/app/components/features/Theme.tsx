'use client'

import { useAppDispatch } from "@/store/hooks"
import { switchTheme } from "@/store/themeSlice"
import { useCallback, useEffect } from "react"

const Theme = () => {
    
    const dispatch = useAppDispatch()

    // Function for setting theme
    const handleSettingTheme = useCallback(() => {

        const storedTheme = localStorage.getItem("theme")
        
        if(storedTheme === "dark"){

            dispatch(switchTheme())

        }

    }, [dispatch])

    useEffect(() => {
        handleSettingTheme()
    }, [handleSettingTheme])

    return (

       <>
       </>

    )

}

export default Theme