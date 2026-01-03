import {
    UserIcon,
    UserCog as AdminIcon,
    UserPlus as TheaterOwnerIcon,
    LucideProps
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

type AuthTabs = Array<{
    title: string,
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    value: "USER" | "ADMIN" | "THEATER_OWNER"
}>

export const authTabs: AuthTabs = [
    {
        title: "User",
        Icon: UserIcon,
        value: "USER"
    },
    {
        title: "Admin",
        Icon: AdminIcon,
        value: "ADMIN"
    },
    {
        title: "Theater Owner",
        Icon: TheaterOwnerIcon,
        value: "THEATER_OWNER"
    }
]