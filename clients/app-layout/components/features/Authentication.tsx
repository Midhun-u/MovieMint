'use client'

import { getProfileApi } from "@/api/auth"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import { useAppDispatch } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

const Authentication = ({
    children,
    redirectToAuthPage = false
}: {
    children: ReactNode
    redirectToAuthPage: boolean
}) => {

    const router = useRouter()
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const dispatch = useAppDispatch()


    // Function for checking authenticated
    const handleCheckAuth = async () => {
        
        const authToken = localStorage.getItem("authToken")
        
        if(!authToken){
            
            setAuthenticated(false)
            if(redirectToAuthPage){
                router.push("/login")
            }
            
            return
            
        }
        
        dispatch(authRequest())
        const result = await getProfileApi(authToken)

        if(result.success && result.user){

            setAuthenticated(true)
            dispatch(authSuccess({user: result.user}))

        }else{

            setAuthenticated(false)
            if(redirectToAuthPage){
                router.push("/login")
            }
            dispatch(authFailed({errorMessage: result.error}))

        }

    }

    useEffect(() => {

        handleCheckAuth()

    }, [])

    if(redirectToAuthPage && !authenticated) return

    return (

        <>
            {children}
        </>

    )

}

export default Authentication