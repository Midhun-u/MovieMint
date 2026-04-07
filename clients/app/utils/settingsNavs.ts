import { LucidReactIconType } from "@/types/lucidReact"
import {
    UserIcon,
    Shield as SecurityIcon,
    HelpCircle as HelpIcon
} from 'lucide-react'

type SettingsNavs = Array<{
    title: string
    Icon: LucidReactIconType,
    value: string
}>

export const settingsNavs: SettingsNavs = [
    {
        title: "Profile",
        Icon: UserIcon,
        value: "profile"
    },
    {
        title: "Security",
        Icon: SecurityIcon,
        value: "security"
    },
    {
        title: "Help & Support",
        Icon: HelpIcon,
        value: "help-support"
    }
]