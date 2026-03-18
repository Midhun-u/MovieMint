'use client'

import { assets } from "@/public/assets/assets"
import { navbarLinks } from "@/utils/navbar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Moon as DarkThemeIcon,
    Sun as WhiteThemeIcon,
    MenuIcon,
    X as CloseMenuIcon,
    ChevronDown as DownArrowIcon,
} from 'lucide-react'
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { switchTheme } from "@/store/themeSlice"
import { Activity, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Authentication from "../features/Authentication"
import DashboardNavigationUI from "../ui/DashboardNavigation"
import NullProfilePic from "../ui/NullProfilePic"
import { envVariables } from "@/utils/envVariables"

const Header = () => {

    const [render, setRender] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { theme } = useAppSelector(state => state.theme)
    const { user } = useAppSelector(state => state.auth)
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const [showOptionMenu, setShowOptionMenu] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string | null>(null)
    const theaterDashboardNavLink = envVariables.THEATER_DASHBAORD_URL + `?authToken=${authToken}`
    const adminDashboardNavLink = envVariables.ADMIN_DASHBOARD_URL + `?authToken=${authToken}`
    const linkClass = "font-medium mt-3 pb-2 w-full flex justify-end"

    // Function for logouting
    const handleLogout = () => {

        localStorage.removeItem("authToken")
        router.push("/login")

    }

    // Function for switching theme
    const handleSwitchTheme = useCallback(() => {

        const root = document.documentElement

        if (theme === "dark") {
            root?.classList.add("switch-theme")
        } else {
            root?.classList.remove("switch-theme")
        }

    }, [theme])

    useEffect(() => {
        (() => {
            setRender(true)
        })()
        handleSwitchTheme()
    }, [theme, handleSwitchTheme])

    useEffect(() => {
        (() => {
            const token = localStorage.getItem("authToken")
            setAuthToken(token)
        })()
    }, [])

    return (

        render
            ?
            <Authentication
                redirectToAuthPage={false}
            >
                <header
                    className="z-50 w-full fixed top-0 h-15 flex justify-between bg-foreground-color sm:grid justify-items-center sm:grid-cols-[100px_1fr_auto] px-3 sm:px-5 gap-3"
                >
                    {/* Logo section */}
                    <div className="flex justify-start items-center w-full">
                        <Image
                            src={assets.logo}
                            alt="logo"
                            width={30}
                            height={30}
                            className="self-center"
                        />
                    </div>
                    {/* Main menu section */}
                    <nav className="w-full hidden sm:flex gap-8 md:gap-10 items-center justify-center">
                        {
                            navbarLinks.map((navbarLink, index) => (

                                <Link
                                    href={navbarLink.route}
                                    title={navbarLink.title}
                                    key={index}
                                    className={`h-full relative flex items-center justify-center px-[0.8px] ${pathname.includes(navbarLink.route) ? "before:w-full before:h-[2.5px] before:bg-primary-color before:absolute before:bottom-2" : ""}`}
                                >
                                    <navbarLink.Icon
                                        size={23}
                                        strokeWidth={1.8}
                                        className={`${pathname.includes(navbarLink.route) ? "stroke-primary-color" : ""} stroke-foreground-theme-color`}
                                    />
                                </Link>

                            ))
                        }
                    </nav>

                    {/* Other menu section */}
                    <nav className="w-full flex items-center gap-2 justify-end sm:justify-center">
                        <div
                            onClick={() => dispatch(switchTheme())}
                            className="p-1 rounded-full cursor-pointer hover:bg-background-color"
                        >
                            {
                                theme === "dark"
                                    ?
                                    <WhiteThemeIcon
                                        size={23}
                                        strokeWidth={1.5}
                                        className="stroke-foreground-theme-color"
                                    />
                                    :
                                    <DarkThemeIcon
                                        size={23}
                                        strokeWidth={1.5}
                                        className="stroke-foreground-theme-color"
                                    />
                            }
                        </div>
                        {
                            showSidebar
                                ?
                                <CloseMenuIcon
                                    size={23}
                                    strokeWidth={1.8}
                                    className="stroke-foreground-theme-color cursor-pointer sm:hidden z-50"
                                    onClick={() => setShowSidebar(false)}
                                />
                                :
                                <MenuIcon
                                    size={23}
                                    strokeWidth={1.8}
                                    className="stroke-foreground-theme-color cursor-pointer sm:hidden z-50"
                                    onClick={() => setShowSidebar(true)}
                                />
                        }
                        {/* Sign button or user profile */}
                        {
                            user?.id && user?.profile_image
                                ?
                                <div
                                    className="hidden w-auto sm:flex items-center gap-1 cursor-pointer relative"
                                    onClick={() => setShowOptionMenu(!showOptionMenu)}
                                >
                                    {
                                        user.profile_image?.image_url
                                            ?
                                            <Image
                                                src={user.profile_image.image_url}
                                                alt="User profile image"
                                                width={30}
                                                height={30}
                                                className="rounded-full cursor-pointer"
                                            />
                                            :
                                            <NullProfilePic
                                            />
                                    }
                                    <DownArrowIcon
                                        size={23}
                                        strokeWidth={1.5}
                                        className={`${showOptionMenu ? "rotate-180" : ""} transition-[rotate] duration-200`}
                                    />
                                    <Activity mode={showOptionMenu ? "visible" : "hidden"}>
                                        <DashboardNavigationUI
                                            authToken={authToken}
                                            handleLogout={handleLogout}
                                            theaterDashboardNavLink={theaterDashboardNavLink}
                                            adminDashboardNavLink={adminDashboardNavLink}
                                        />
                                    </Activity>
                                </div>
                                :
                                <Button
                                    size={"sm"}
                                    className="bg-foreground-color hidden sm:block hover:bg-background-color text-foreground-theme-color border-2 border-foreground-theme-color/20"
                                    onClick={() => router.push("/sign")}
                                >
                                    Sign In
                                </Button>

                        }

                        {/* Sidebar */}
                        <aside className={`fixed text-foreground-theme-color pt-17 px-3 sm:px-5 ${showSidebar ? "left-0" : "-left-500"} transition-all duration-200 flex flex-col sm:hidden w-full h-full  overflow-auto top-0 z-40 bg-foreground-color`}>
                            {
                                user
                                    ?
                                    null
                                    :
                                    <Link
                                        href={"/sign"}
                                        className={linkClass + " mt-0"}
                                    >
                                        Sign In
                                    </Link>
                            }
                            {
                                user?.role === "ADMIN"
                                    ?
                                    <Link
                                        href={adminDashboardNavLink}
                                        className="font-medium mt-3 border-b-2 pb-2 border-foreground-theme-color/20 w-full flex justify-end"
                                    >
                                        Admin Dashboard
                                    </Link>
                                    :
                                    null
                            }
                            {
                                user?.role === "THEATER_OWNER"
                                    ?
                                    <>
                                        <Link
                                            href={theaterDashboardNavLink}
                                            className={linkClass}
                                        >
                                            Theater Dashboard
                                        </Link>
                                        <Link
                                            href={"/theater-registration"}
                                            className={linkClass}
                                        >
                                            Theater Registration
                                        </Link>
                                    </>
                                    :
                                    null
                            }
                            {
                                user
                                    ?
                                    <li
                                        onClick={handleLogout}
                                        className={linkClass}
                                    >
                                        Logout
                                    </li>
                                    :
                                    null
                            }
                        </aside>

                    </nav>
                    {/* Bottom navbar for mobiles */}
                    <nav
                        className={`${showSidebar ? "hidden" : ""} sm:hidden fixed left-0 justify-center bottom-4 z-30 w-full h-13 flex`}
                    >
                        <div className="flex px-5 rounded-lg items-center h-full justify-center gap-8 bg-foreground-color border border-foreground-theme-color/20">
                            {
                                navbarLinks.map((navbarLink, index) => (

                                    <Link
                                        href={navbarLink.route}
                                        key={index}
                                        className={`relative ${pathname.includes(navbarLink.route) ? "before:absolute before:w-full before:h-0.5 before:bg-primary-color before:-bottom-2" : ""}`}
                                    >
                                        <navbarLink.Icon
                                            size={23}
                                            strokeWidth={1.8}
                                            className={`${pathname.includes(navbarLink.route) ? "stroke-primary-color" : ""} stroke-foreground-theme-color`}
                                        />
                                    </Link>

                                ))
                            }
                        </div>
                    </nav>
                </header>
            </Authentication>
            :
            null
    )
}

export default Header