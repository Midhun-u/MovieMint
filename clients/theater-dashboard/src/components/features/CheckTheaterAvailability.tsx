import { useEffect, type ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useLocation } from "react-router"
import { theaterFailed, theaterRequest, theaterSuccess } from "../../store/theaterSlice"
import { getTheaterApi } from "../../api/theater"
import style from '../../styles/features/checkTheaterAvailability.module.scss'
import { assets } from "../../assets/assets"
import Button from "../ui/Button"
import { envVariables } from "../../utils/envVariables"

interface CheckTheaterAvailabilityProps {
    children: ReactNode
}

const CheckTheaterAvailability = ({ children }: CheckTheaterAvailabilityProps) => {

    const { theater } = useAppSelector(state => state.theater)
    const dispatch = useAppDispatch()
    const pathname = useLocation().pathname

    // Function for getting theater
    const handleGetTheater = async () => {

        dispatch(theaterRequest())

        const result = await getTheaterApi()

        if (result.success) {
            dispatch(theaterSuccess({ theater: result.theater }))
        } else {
            dispatch(theaterFailed({ errorMessage: result.errorMessage }))
        }

    }

    useEffect(() => {
        handleGetTheater()
    }, [pathname])

    return (
        <>
            {
                theater.status === "AVAILABLE"
                    ?
                    children
                    :
                    <div className={style.container}>
                        <img
                            src={assets.noData}
                            className={style.image}
                        />
                        <p className={style.about}>
                            Your theater is not available right now. It's need to verify by admin so please wait to be verify by admin
                        </p>
                        <Button
                            title="Go To Home"
                            className={style.button}
                            onClick={() => window.location.href = envVariables.APP_URL}
                        />
                    </div>
            }
        </>
    )

}

export default CheckTheaterAvailability