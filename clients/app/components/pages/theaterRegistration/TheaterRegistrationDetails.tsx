import { TheaterDetails } from "@/types/theater"
import TheaterDetailsCard from "./TheatereDetailsCard"
import TheaterSeatLayout from "@/components/layout/TheaterSeatLayout"
import { Button } from "@/components/ui/button"
import { deleteTheaterRegistrationApi } from "@/api/theater"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { theaterRequest, theaterSuccess } from "@/store/theaterSlice"
import Spinner from "@/components/ui/Spinner"
import { deleteTheaterImageApi } from "@/api/media"
import { Dispatch, SetStateAction, useContext } from "react"
import { ToastProvider } from "@/components/context/ToastMessage"

interface TheaterRegistrationDetailsProps {
    theaterDetails: TheaterDetails
    setTheater: Dispatch<SetStateAction<TheaterDetails | null>>
}

const TheaterRegistrationDetails = ({ theaterDetails, setTheater }: TheaterRegistrationDetailsProps) => {

    const { loading } = useAppSelector(state => state.theater)
    const { theme } = useAppSelector(state => state.theme)
    const toastContext = useContext(ToastProvider)
    const dispatch = useAppDispatch()


    // Function for deleting theater registration
    const handleDeleteTheaterRegistration = async () => {

        if (!theaterDetails || !theaterDetails.id) return

        const authToken = localStorage.getItem("authToken") || ""

        dispatch(theaterRequest())

        // Deleting theater and theater image
        const [deleteTheaterResult, deleteTheaterImageResult] = await Promise.all([
            deleteTheaterRegistrationApi(theaterDetails.id, authToken),
            deleteTheaterImageApi(theaterDetails.id, authToken)
        ])

        if (deleteTheaterImageResult.success && deleteTheaterResult.success) {
            toastContext?.triggerToastMessage("Theater registration is cancelled", "SUCCESS")
            setTheater(null)
        } else {
            toastContext?.triggerToastMessage("Theater registration couldn't cancel", "ERROR")
        }

        dispatch(theaterSuccess({ theater: null }))

    }

    return (

        <div className="w-full">
            {/* Title section */}
            <div className="w-full flex flex-col -gap-1">
                <h1 className="text-md font-medium ">Registered Theater</h1>
                <p className="text-sm text-foreground-theme-color/50">This allows to see the theater which you registered </p>
            </div>
            {/* Theater Details */}
            <div className="mt-7 w-full flex flex-col items-center sm:items-start">
                <TheaterDetailsCard
                    theaterDetails={theaterDetails}
                />
                <div className="mt-15 w-full flex flex-col items-center">
                    {/* Theater Seat Layout */}
                    <TheaterSeatLayout
                        preview
                        layoutNumber={theaterDetails.layout_number || 0}
                        setsNumber={theaterDetails.sets_number || 0}
                        rowNumber={theaterDetails.rows_number || 0}
                        seatNumber={theaterDetails.seats_number || 0}
                    />
                    {
                        theaterDetails.status === "PENDING"
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
        </div>

    )

}

export default TheaterRegistrationDetails