import SettingsNavBar from "@/components/pages/settings/SettingsNavBar"
import PageDetails from "@/components/ui/PageDetails"
import { ReactNode } from "react"

const SettingsLayout = ({
    children
}: {
    children: ReactNode
}) => {

    return (
        <div className="w-full flex justify-center">
            <div className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-2.5">
                <PageDetails
                    title="Settings"
                    about=""
                    backButton={false}
                />
                <div className="w-full grid grid-cols-[auto_1fr] h-full max-h-125">
                    <SettingsNavBar
                    />
                    <div className="w-full bg-foreground-color pl-2.5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SettingsLayout