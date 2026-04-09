'use client'

import Authentication from "@/components/features/Authentication"
import SettingsNavBar from "@/components/pages/settings/SettingsNavBar"
import ProfilePage from "@/components/profile/ProfilePage"
import PasswordPage from "@/components/password/PasswordPage"
import PageDetails from "@/components/ui/PageDetails"
import { useEffect, useState } from "react"
import HelpAndSupportPage from "@/components/help-support/HelpAndSupportPage"

const SettingsPage = () => {

    const [selectedPagedName, setSelectedPagedName] = useState<string>("")

    // Function for getting corresponding page
    const handleGetPage = () => {

        switch (selectedPagedName) {

            case "profile":
                return <ProfilePage
                    setSelectedPageName={setSelectedPagedName}
                />

            case "password":
                return <PasswordPage
                    setSelectedPagedName={setSelectedPagedName}
                />

            case "help-support":
                return <HelpAndSupportPage
                    setSelectedPagedName={setSelectedPagedName}
                />

        }

    }

    useEffect(() => {

        const handleResize = () => {

            const width = window.innerWidth
            if (width >= 700) {
                setSelectedPagedName("profile")
            } else {
                setSelectedPagedName("")
            } 

        }
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return (
        <Authentication redirectToAuthPage>
            <div className="w-full flex justify-center">
                <div className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-2.5">
                    <PageDetails
                        title="Settings"
                        about=""
                        backButton={false}
                    />
                    <div className={`max-[700px]:grid-cols-1 w-full grid grid-cols-[auto_1fr] h-full`}>
                        <SettingsNavBar
                            selectedValue={selectedPagedName}
                            setSelectedValue={setSelectedPagedName}
                        />
                        <div className={`max-[700px]:${selectedPagedName ? "flex" : "hidden"} w-full max-[700px]:pl-0 pl-2.5`}>
                            {handleGetPage()}
                        </div>
                    </div>
                </div>
            </div>
        </Authentication>
    )

}

export default SettingsPage