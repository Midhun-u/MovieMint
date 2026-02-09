import { useEffect, useState, type ReactNode } from "react"
import { useSearchParams } from "react-router"
import { envVariables } from "../../utils/envVariables"
import { getTheaterOwnerApi } from "../../api/auth"
import { useDispatch } from "react-redux"
import { authFailed, authRequest, authSuccess } from "../../store/authSlice"

const ProtectRoute = ({
    children
}: {
    children: ReactNode
}) => {

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [param] = useSearchParams()
    const dispatch = useDispatch()

    // Function for checking admin authenticated
    const handleCheckAuth = async () => {

        const authToken = param.get("authToken")
        const storedAuthToken = localStorage.getItem("authToken")

        if (!storedAuthToken && !authToken) {
            window.location.href = envVariables.APP_URL + "/login"
            return
        }

        dispatch(authRequest())
        const result = await getTheaterOwnerApi(storedAuthToken ? storedAuthToken : authToken as string)

        if (result.success && result?.user?.role === "THEATER_OWNER") {
            dispatch(authSuccess({ theaterOwner: result.user }))

            localStorage.setItem("authToken", storedAuthToken ? storedAuthToken : authToken as string)
            setAuthenticated(true)

            return

        } else {

            dispatch(authFailed({ errorMessage: result.error }))

            window.location.href = envVariables.APP_URL + "/login"
            return

        }

    }

    useEffect(() => {
        handleCheckAuth()
    }, [])

    if (!authenticated) return null

    return (
        <>
            {children}
        </>
    )

}

export default ProtectRoute