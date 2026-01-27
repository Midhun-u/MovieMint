import { useAppSelector } from '@/store/hooks'
import { envVariables } from '@/utils/envVariables'
import {
    LayoutGrid as DashboardIcon,
    HousePlus as TheaterRegistrationIcon,
    LogOutIcon
} from 'lucide-react'
import Link from 'next/link'

interface DashboardNavigationUIProps{
    authToken: string | null
    handleLogout: () => void
    theaterDashboardNavLink: string
    adminDashboardNavLink: string
}

const DashboardNavigationUI = ({authToken, handleLogout, theaterDashboardNavLink, adminDashboardNavLink}: DashboardNavigationUIProps) => {

    const { user } = useAppSelector(state => state.auth)

    return (
        <div className="absolute flex flex-col gap-4 w-max top-13 right-0 border border-disable-color/40 h-auto p-3 bg-foreground-color rounded-sm text-sm font-medium">
            {
                user.role === "THEATER_OWNER"
                    ?
                    <>
                        <Link
                            href={theaterDashboardNavLink}
                            className="flex gap-2"
                        >
                            <DashboardIcon
                                size={20}
                                strokeWidth={1.5}
                            />
                            Theater Dashboard
                        </Link>
                        <Link
                            href={"/theater-registration"}
                            className="flex gap-2"
                        >
                            <TheaterRegistrationIcon
                                size={20}
                                strokeWidth={1.5}
                            />
                            Theater Registration
                        </Link>
                    </>
                    :
                    (
                        user.role === "ADMIN"
                            ?
                            <Link
                                href={adminDashboardNavLink}
                                className="flex gap-2"
                            >
                                <DashboardIcon
                                    size={20}
                                    strokeWidth={1.5}
                                />
                                Admin Dashboard
                            </Link>
                            :
                            null
                    )
            }
            <li
                className='flex gap-2 cursor-pointer'
                onClick={handleLogout}
            >
                <LogOutIcon
                    size={20}
                    strokeWidth={1.5}
                />
                Logout
            </li>
        </div>

    )

}

export default DashboardNavigationUI