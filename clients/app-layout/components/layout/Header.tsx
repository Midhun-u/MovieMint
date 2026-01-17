'use client'

import { assets } from "@/public/assets/assets"
import { navbarLinks } from "@/utils/navbar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Moon as DarkThemeIcon,
    Sun as WhiteThemeIcon
} from 'lucide-react'
import { Button } from "../ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { switchTheme } from "@/store/themeSlice"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Header = () => {

    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { theme } = useAppSelector(state => state.theme)

    // Function for switching theme
    const handleSwitchTheme = () => {

        const body = document.getElementById("body")

        if (theme === "white") {
            body?.classList.add("switch-theme")
        } else {
            body?.classList.remove("switch-theme")
        }

    }

    useEffect(() => {

        handleSwitchTheme()

    }, [theme])

    return (

        <header
            className="w-full h-15 bg-foreground-color grid justify-items-center grid-cols-[90px_1fr_100px] px-5 gap-3"
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
            <nav className="w-full flex gap-10 items-center justify-center">
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
                                className={`${pathname === navbarLink.route ? "stroke-primary-color" : ""}`}
                            />
                        </Link>

                    ))
                }
            </nav>

            {/* Other menu section */}
            <nav className="w-full flex items-center gap-2 justify-center">
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
                            />
                            :
                            <DarkThemeIcon
                                size={23}
                                strokeWidth={1.8}
                            />
                    }
                </div>
                <Button
                    size={"sm"}
                    className="bg-foreground-color hover:bg-disable-color/20 text-foreground-theme-color border-2 border-disable-color/20"
                    onClick={() => router.push("/sign")}
                >
                    Sign In
                </Button>
            </nav>
        </header>

    )
}

export default Header