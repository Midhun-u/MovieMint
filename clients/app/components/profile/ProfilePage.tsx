import { Dispatch, SetStateAction } from "react"
import ProfileForm from "./ProfileForm"
import {
    ChevronLeft as BackIcon
} from 'lucide-react'

interface ProfilePageProps{
    setSelectedPageName: Dispatch<SetStateAction<string>>
}

const ProfilePage = ({
    setSelectedPageName
}: ProfilePageProps) => {

    return (

        <div className="max-[700px]:p-0 p-5 flex flex-col gap-5 max-h-125 overflow-scroll">
            <div className="flex gap-1.25">
                <BackIcon
                    className="max-[700px]:block hidden cursor-pointer"
                    onClick={() => setSelectedPageName("")}
                />
                <div>
                    <h2 className="font-semibold text-[1rem]">Profile Information</h2>
                    <p className="text-[0.9rem] text-foreground-theme-color/50 font-medium">Update your personal details and public profile.</p>
                </div>
            </div>
            <ProfileForm
            />
        </div>

    )

}

export default ProfilePage