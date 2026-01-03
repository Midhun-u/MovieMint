'use client'

import { useState } from "react"
import AuthTab from "./AuthTab"

const Form = () => {

    const [currentTabValue, setCurrentTabValue] = useState<"USER" | "ADMIN" | "THEATER_OWNER">("USER")

  return (

    <form className="w-full ">
       <AuthTab 
            currentTabValue={currentTabValue}
            setCurrentTabValue={setCurrentTabValue}
       /> 
    </form>

  )
}

export default Form