import { LucidReactIconType } from "@/types/lucidReact"
import {
    UserIcon,
    Shield as SecurityIcon,
    HelpCircle as HelpIcon
} from 'lucide-react'

type SettingsNavs = Array<{
    title: string
    Icon: LucidReactIconType,
    route: string
}>

export const settingsNavs: SettingsNavs = [
    {
        title: "Profile",
        Icon: UserIcon,
        route: "/settings/profile"
    },
    {
        title: "Security",
        Icon: SecurityIcon,
        route: "/settings/security"
    },
    {
        title: "Help & Support",
        Icon: HelpIcon,
        route: "/settings/help-support"
    }
]