import type { LucideReactIconType } from "../types/lucideReactType"
import {
    LayoutGrid as DashboardIcon,
    Plus as AddMoviesIcon,
    Theater as TheaterRequestIcon,
    TvMinimalPlay as MoviesIcon,
    Tv as TheaterIcon,
    BookMarked as BookingsIcon
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
        title: "Add Movies",
        route: "/admin/add-movies",
        Icon: AddMoviesIcon
    },
    {
        title: "Theater Requests",
        route: "/admin/theater-requests",
        Icon: TheaterRequestIcon
    },
    {
        title: "Movies",
        route: "/admin/movies",
        Icon: MoviesIcon
    },
    {
        title: "Theaters",
        route: "/admin/theaters",
        Icon: TheaterIcon
    },
    {
        title: "Bookings",
        route: "/admin/bookings",
        Icon: BookingsIcon
    }
]