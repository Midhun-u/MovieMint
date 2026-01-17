import { LucidReactIconType } from "@/types/lucidReact"
import {
    TvMinimalPlay as MoviesIcon,
    NotepadText as BookingsIcon,
    Bookmark as SavedListIcon,
    Bell as NotificationIcon,
    SettingsIcon
} from 'lucide-react'

type NavbarLinks = {
    title: string
    Icon: LucidReactIconType
    route: string
}[]

export const navbarLinks: NavbarLinks = [
    {
        title: "Movies",
        route: "/movies",
        Icon: MoviesIcon
    },
    {
        title: "Bookings",
        route: "/bookings",
        Icon: BookingsIcon
    },
    {
        title: "Saved List",
        route: "/saved-list",
        Icon: SavedListIcon
    },
    {
        title: "Notification",
        route: "/notification",
        Icon: NotificationIcon
    },
    {
        title: "Settings",
        route: "/settings",
        Icon: SettingsIcon
    }
]