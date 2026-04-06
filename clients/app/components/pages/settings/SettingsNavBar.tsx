'use client'

import { settingsNavs } from "@/utils/settingsNavs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SettingsNavBar = () => {

    const pathname = usePathname()

    return (
        <div className="w-max bg-background-color h-full flex flex-col gap-2.5 overflow-scroll">
            {
                settingsNavs.map((nav, index) => (
                    <Link
                        href={nav.route}
                        key={index}
                        className={`${pathname.includes(nav.route)? "bg-foreground-color before:content-['*'] bofore:w-full before:h-full before:bg-primary-color before:absolute": ""} relative flex items-center gap-2.5 px-5 py-2.5`}
                    >
                        <nav.Icon
                            size={23}
                            strokeWidth={1.7}
                        />
                        <span className="text-[0.9rem] font-medium">{nav.title}</span>
                    </Link>
                ))
            }
        </div>
    )

}

export default SettingsNavBar