'use client'

import Authentication from "@/components/features/Authentication"
import SettingsNavBar from "@/components/pages/settings/SettingsNavBar"
import ProfilePage from "@/components/profile/ProfilePage"
import PageDetails from "@/components/ui/PageDetails"
import { useEffect, useState } from "react"

const SettingsPage = () => {

    const [selectedPageName, setSelectedPageName] = useState<string>("")

    // Function for getting corresponding page
    const handleGetPage = () => {

        switch (selectedPageName) {

            case "profile":
                return <ProfilePage
                    setSelectePageName={setSelectedPageName}
                />

        }

    }

    useEffect(() => {

        const handleResize = () => {

            const width = window.innerWidth
            if (width >= 700) {
                setSelectedPageName("profile")
            } else {
                setSelectedPageName("")
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
                            selectedValue={selectedPageName}
                            setSelectedValue={setSelectedPageName}
                        />
                        <div className={`max-[700px]:${selectedPageName ? "flex" : "hidden"} w-full max-[700px]:pl-0 pl-2.5`}>
                            {handleGetPage()}
                        </div>
                    </div>
                </div>
            </div>
        </Authentication>
    )

}

export default SettingsPage