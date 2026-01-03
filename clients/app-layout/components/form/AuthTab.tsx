import React from "react"
import { authTabs } from "@/utils/authTab"

interface AuthTabProps {
    currentTabValue: "USER" | "ADMIN" | "THEATER_OWNER",
    setCurrentTabValue: React.Dispatch<React.SetStateAction<"USER" | "ADMIN" | "THEATER_OWNER">>
}

const AuthTab = ({ setCurrentTabValue, currentTabValue }: AuthTabProps) => {

    return (

        <div className="mt-7 w-full">
            <ul className="w-full gap-3 flex justify-start items-center">
                {
                    authTabs.map((authTab, index) => (

                        <li
                            onClick={() => setCurrentTabValue(authTab.value)}
                            key={index}
                            className={`${currentTabValue === authTab.value ? "before:absolute before:w-full before:h-[2.2px] before:left-0 before:bg-primary-color before:bottom-0" : ""} relative flex items-center gap-1.5 py-2 px-3 border border-background-color ${currentTabValue === authTab.value ? "hover:bg-background-color" : "hover:bg-foreground-color hover:border-disable-color/19"}  rounded-sm cursor-pointer transition-all duration-200`}
                        >
                            <authTab.Icon
                                size={20}
                                strokeWidth={1.5}
                            />
                            <span className="text-xs font-medium">{authTab.title}</span>
                        </li>

                    ))
                }
            </ul>
        </div>

    )
}

export default AuthTab