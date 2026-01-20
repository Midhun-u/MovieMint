import { useEffect, useState, type ReactNode } from "react"
import { useNavigate, useParams } from "react-router"
import { envVariables } from "../../utils/envVariables"
import { getAdminProfile } from "../../api/auth"
import { useDispatch } from "react-redux"
import { authFailed, authRequest, authSuccess } from "../../store/authSlice"

const ProtectRoute = ({
    children
}: {
    children: ReactNode
}) => {

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const {authToken} = useParams()
    const storedAuthToken = localStorage.getItem("authToken")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Function for checking admin authenticated
    const handleCheckAuth = async () => {


        if(!storedAuthToken && !authToken){
            navigate(envVariables.APP_URL + "/login")
            return
        }

        dispatch(authRequest())
        const result = await getAdminProfile(authToken? authToken: storedAuthToken as string)

        if(result.success && result?.user?.role === "ADMIN"){

            dispatch(authSuccess({admin: result.user}))

            localStorage.setItem("authToken", authToken as string)
            setAuthenticated(true)
            
            return

        }else{

            dispatch(authFailed({errorMessage: result.error}))

            navigate(envVariables.APP_URL + "/login")
            return

        }

    }

    useEffect(() => {
        handleCheckAuth()
    }, [])

    if(!authenticated) return null

    return (
        <>
            {children}
        </>
    )

}

export default ProtectRoute