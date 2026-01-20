'use client'

import { useAppDispatch } from "@/store/hooks"
import { switchTheme } from "@/store/themeSlice"
import { useEffect } from "react"

const Theme = () => {
    
    const dispatch = useAppDispatch()

    // Function for setting theme
    const handleSettingTheme = () => {

        const storedTheme = localStorage.getItem("theme")
        
        if(storedTheme === "dark"){

            dispatch(switchTheme())

        }

    }

    useEffect(() => {
        handleSettingTheme()
    }, [])

    return (

       <>
       </>

    )

}

export default Theme