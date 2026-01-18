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
    X as CloseMenuIcon
} from 'lucide-react'
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { switchTheme } from "@/store/themeSlice"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Header = () => {

    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { theme } = useAppSelector(state => state.theme)
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    // Function for switching theme
    const handleSwitchTheme = () => {

        const root = document.documentElement

        if (theme === "dark") {
            root?.classList.add("switch-theme")
        } else {
            root?.classList.remove("switch-theme")
        }

    }

    useEffect(() => {

        handleSwitchTheme()

    }, [theme])

    return (

        <header
            className="z-50 w-full h-15 flex justify-between bg-foreground-color sm:grid justify-items-center sm:grid-cols-[100px_1fr_auto] px-3 sm:px-5 gap-3"
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
                            className={`h-full relative flex items-center justify-center px-[0.8px] ${pathname === navbarLink.route ? "before:w-full before:h-[2.5px] before:bg-primary-color before:absolute before:bottom-2" : ""}`}
                        >
                            <navbarLink.Icon
                                size={23}
                                strokeWidth={1.8}
                                className={`${pathname === navbarLink.route ? "stroke-primary-color" : ""} stroke-foreground-theme-color`}
                            />
                        </Link>

                    ))
                }
            </nav>

            {/* Other menu section */}
            <nav className="w-full flex items-center gap-2 justify-end sm:justify-center">
                <div
                    onClick={() => dispatch(switchTheme())}
                    className="p-1 rounded-full cursor-pointer hover:bg-disable-color/20"
                >
                    {
                        theme === "dark"
                            ?
                            <WhiteThemeIcon
                                size={23}
                                strokeWidth={1.8}
                                className="stroke-foreground-theme-color"
                            />
                            :
                            <DarkThemeIcon
                                size={23}
                                strokeWidth={1.8}
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
                <Button
                    size={"sm"}
                    className="bg-foreground-color hidden sm:block hover:bg-background-color text-foreground-theme-color border-2 border-foreground-theme-color/20"
                    onClick={() => router.push("/sign")}
                >
                    Sign In
                </Button>

                {/* Sidebar */}
                <aside className={`absolute text-foreground-theme-color pt-17 px-3 sm:px-5 ${showSidebar ? "left-0" : "left-500"} transition-all duration-200 flex flex-col sm:hidden w-full h-full  overflow-auto top-0 z-40 bg-foreground-color`}>
                    <Link
                        href={"/sign"}
                        className="font-medium border-b-2 pb-2 border-foreground-theme-color/20 w-full flex justify-end"
                    >
                        Sign In
                    </Link>
                </aside>

            </nav>
            {/* Bottom navbar for mobiles */}
            <nav
                className={`${showSidebar? "hidden": ""} sm:hidden fixed left-0 justify-center bottom-4 z-30 w-full h-13 flex`}
            >
                <div className="flex px-5 rounded-lg items-center h-full justify-center gap-8 bg-foreground-color border border-disable-color/20">
                    {
                        navbarLinks.map((navbarLink, index) => (

                            <Link
                                href={navbarLink.route}
                                key={index}
                                className={`relative ${pathname === navbarLink.route ? "before:absolute before:w-full before:h-0.5 before:bg-primary-color before:-bottom-2" : ""}`}
                            >
                                <navbarLink.Icon
                                    size={23}
                                    strokeWidth={1.8}
                                    className={`${pathname === navbarLink.route ? "stroke-primary-color" : ""} stroke-foreground-theme-color`}
                                />
                            </Link>

                        ))
                    }
                </div>
            </nav>
        </header>

    )
}

export default Header