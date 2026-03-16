'use client'

import { getTheaterApi } from "@/api/theater"
import Authentication from "@/components/features/Authentication"
import TheaterRegistrationForm from "@/components/form/TheaterRegistrationForm"
import TheaterRegistrationDetails from "@/components/pages/theaterRegistration/TheaterRegistrationDetails"
import { useAppSelector } from "@/store/hooks"
import { theaterFailed, theaterRequest, theaterSuccess } from "@/store/theaterSlice"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"

const TheaterRegistrationPage = () => {

    const dispatch = useDispatch()
    const { theater } = useAppSelector(state => state.theater)

    // Function for getting theater
    const handleGetTheater = useCallback(async () => {

        const authToken = localStorage.getItem('authToken') || ""

        dispatch(theaterRequest())
        const result = await getTheaterApi(authToken)
        if (result.success) {
            dispatch(theaterSuccess({ theater: result.theater }))
        } else {
            dispatch(theaterFailed({ errorMessage: result.error }))
        }

    }, [dispatch])

    useEffect(() => {
        (() => {
            handleGetTheater()
        })()
    }, [handleGetTheater])

    return (
        <Authentication
            redirectToAuthPage
        >
            <section className="flex justify-center">
                <div className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full">
                    {
                        theater
                            ?
                            <TheaterRegistrationDetails
                            />
                            :
                            <TheaterRegistrationForm
                            />
                    }
                </div>
            </section>
        </Authentication>
    )

}

export default TheaterRegistrationPage