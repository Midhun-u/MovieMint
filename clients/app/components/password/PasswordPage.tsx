import {
    ChevronLeft as BackIcon
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import PasswordForm from './PasswordForm'

interface PasswordPageProps{
    setSelectedPagedName: Dispatch<SetStateAction<string>>
}

const PasswordPage = ({setSelectedPagedName}: PasswordPageProps) => {

    return (

        <div className="max-[700px]:p-0 p-5 flex flex-col gap-5 max-h-125 overflow-scroll">
            <div className="flex gap-1.25">
                <BackIcon
                    className="max-[700px]:block hidden cursor-pointer"
                    onClick={() => setSelectedPagedName("")}
                />
                <div>
                    <h2 className="font-semibold text-[1rem]">Change Password</h2>
                    <p className="text-[0.9rem] text-foreground-theme-color/50 font-medium">Update your password to keep your account secure.</p>
                </div>
            </div>
            <PasswordForm
            />
        </div>

    )

}

export default PasswordPage