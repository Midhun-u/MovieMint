'use client'

import { getTheaterApi } from "@/api/theater"
import Authentication from "@/components/features/Authentication"
import TheaterRegistrationForm from "@/components/form/TheaterRegistrationForm"
import TheaterRegistrationDetails from "@/components/pages/theaterRegistration/TheaterRegistrationDetails"
import { TheaterDetails } from "@/types/theater"
import { useEffect, useState } from "react"

const TheaterRegistrationPage = () => {

    const [theater, setTheater] = useState<TheaterDetails | null>(null)

    // Function for getting theater
    const handleGetTheater = async () => {

        const authToken = localStorage.getItem('authToken') || ""

        const result = await getTheaterApi(authToken)
        if (result.success) {
            setTheater(result.theater)
        }

    }

    useEffect(() => {
        (() => {
            handleGetTheater()
        })()
    }, [])

    return (
        <Authentication
            redirectToAuthPage
        >
            <section className="pt-15">
                {
                    theater
                        ?
                        <TheaterRegistrationDetails
                            theaterDetails={theater}
                            setTheater={setTheater}
                        />
                        :
                        <TheaterRegistrationForm
                        />
                }
            </section>
        </Authentication>
    )

}

export default TheaterRegistrationPage