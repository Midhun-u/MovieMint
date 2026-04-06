import Authentication from '@/components/features/Authentication'
import ProfileForm from '@/components/pages/settings/ProfileForm'
import {
    ChevronLeft as BackIcon
} from 'lucide-react'

const profilePage = () => {

    return (
        <div className="p-5 flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
                <BackIcon
                    size={25}
                    strokeWidth={1.7}
                    className='cursor-pointer hidden'
                />
                <div>
                    <h1 className="text-[1rem] font-semibold">Profile Information</h1>
                    <p className="text-sm text-foreground-theme-color/50">Update your personal details and public profile.</p>
                </div>
            </div>
            <Authentication redirectToAuthPage>
                <ProfileForm
                />
            </Authentication>
        </div>
    )

}

export default profilePage