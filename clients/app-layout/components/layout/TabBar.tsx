'use client'

import { tabBarNavs } from "@/utils/tabBar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TabBar = () => {

    const pathname = usePathname()

    return (

        <nav className="w-full sm:w-auto bg-foreground-color rounded-2xl px-1 py-1 flex items-center overflow-x-scroll">
            {
                tabBarNavs.map((tabBarNav, index) => (

                    <Link
                        href={tabBarNav.route}
                        key={index}
                        className={`text-xs shrink-0 font-medium px-5 py-1 ${pathname === tabBarNav.route? "bg-primary-color rounded-xl text-dark-foreground-color": ""}`}
                    >
                        {tabBarNav.title}
                    </Link>

                ))
            }
        </nav>

    )

}

export default TabBar