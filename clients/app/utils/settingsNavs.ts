import { LucidReactIconType } from "@/types/lucidReact"
import {
    UserIcon,
    Lock as PasswordIcon,
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
        title: "Password",
        Icon: PasswordIcon,
        value: "password"
    },
    {
        title: "Help & Support",
        Icon: HelpIcon,
        value: "help-support"
    }
]