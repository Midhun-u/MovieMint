import type { LucideReactIconType } from "../types/lucideReactType"
import {
    LayoutGrid as DashboardIcon,
    BookMarked as BookingsIcon,
    Clapperboard as ShowsIcon,
    PictureInPicture2 as CurrentShowsIcon,
    SettingsIcon
} from 'lucide-react'

type SidebarNavs = Array<{
    title: string
    route: string
    Icon: LucideReactIconType
}>

export const sidebarNavs: SidebarNavs = [
    {
        title: "Dashboard",
        route: "/",
        Icon: DashboardIcon
    },
    {
        title: "Bookings",
        route: "/theater/bookings",
        Icon: BookingsIcon
    },
    {
        title: "Add Shows",
        route: "/theater/add-shows",
        Icon: ShowsIcon
    },
    {
        title: "Current Shows",
        route: "/theater/current-shows",
        Icon: CurrentShowsIcon
    },
    {
        title: "Theater Settings",
        route: "/theater/settings",
        Icon: SettingsIcon
    }
]