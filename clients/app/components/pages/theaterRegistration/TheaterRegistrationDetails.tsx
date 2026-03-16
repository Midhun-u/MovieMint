import TheaterDetailsCard from "./TheatereDetailsCard"
import TheaterSeatLayout from "@/components/layout/TheaterSeatLayout"
import { Button } from "@/components/ui/button"
import { deleteTheaterRegistrationApi } from "@/api/theater"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { theaterFailed, theaterRequest, theaterSuccess } from "@/store/theaterSlice"
import Spinner from "@/components/ui/Spinner"
import { deleteTheaterImageApi } from "@/api/media"
import { useContext } from "react"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import PageDetails from "@/components/ui/PageDetails"

const TheaterRegistrationDetails = () => {

    const { loading, theater } = useAppSelector(state => state.theater)
    const { theme } = useAppSelector(state => state.theme)
    const toastContext = useContext(ToastProvider)
    const dispatch = useAppDispatch()


    // Function for deleting theater registration
    const handleDeleteTheaterRegistration = async () => {

        if (!theater || !theater.id) return

        const authToken = localStorage.getItem("authToken") || ""

        dispatch(theaterRequest())

        // Deleting theater and theater image
        const [deleteTheaterResult, deleteTheaterImageResult] = await Promise.all([
            deleteTheaterRegistrationApi(theater.id, authToken),
            deleteTheaterImageApi(theater.id, authToken)
        ])

        if (deleteTheaterImageResult.success && deleteTheaterResult.success) {
            toastContext?.triggerToastMessage("Theater registration is cancelled", "SUCCESS")
            dispatch(theaterSuccess({ theater: null }))
        } else {
            toastContext?.triggerToastMessage("Theater registration couldn't cancel", "ERROR")
            dispatch(theaterFailed({ errorMessage: "" }))
        }


    }

    return (

        <div className="w-full">
            {/* Title section */}
            <PageDetails
                title="Registered Theater"
                about="This allows to see the theater which you registered."
                backButton={false}
            />
            {/* Theater Details */}
            {
                theater
                    ?
                    <div className="mt-7 w-full flex flex-col items-center sm:items-start">
                        <TheaterDetailsCard
                            theaterDetails={theater}
                        />
                        <div className="mt-15 w-full flex flex-col items-center">
                            {/* Theater Seat Layout */}
                            <TheaterSeatLayout
                                preview
                                layoutNumber={theater.layout_number || 0}
                                setsNumber={theater.sets_number || 0}
                                rowNumber={theater.rows_number || 0}
                                seatNumber={theater.seats_number || 0}
                            />
                            {
                                theater.status === "PENDING"
                                    ?
                                    <Button
                                        className="mt-15 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] bg-foreground-color text-sm border border-foreground-theme-color/20 text-foreground-theme-color hover:bg-background-color"
                                        disabled={loading}
                                        onClick={handleDeleteTheaterRegistration}
                                    >
                                        {
                                            loading
                                                ?
                                                <Spinner
                                                    size={21}
                                                    color={theme === "dark" ? "white" : "black"}
                                                />
                                                :
                                                <span>Cancel Registration</span>
                                        }
                                    </Button>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    :
                    null
            }
        </div>

    )

}

export default TheaterRegistrationDetails