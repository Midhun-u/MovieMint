'use client'

import { settingsNavs } from "@/utils/settingsNavs"
import { Dispatch, SetStateAction } from "react"

interface SettingsNavBarProps {
    selectedValue: string
    setSelectedValue: Dispatch<SetStateAction<string>>
}

const containerClassName = "w-full bg-background-color max-h-125 flex flex-col gap-2.5 overflow-scroll"
const optionClassName = "relative flex items-center gap-2.5 py-2.5 cursor-pointer"
const optionTextClassName = "text-[0.9rem] font-medium"

const SettingsNavBar = ({
    selectedValue,
    setSelectedValue
}: SettingsNavBarProps) => {

    return (
        <>
            <div className={`max-[700px]:hidden ${containerClassName}`}>
                {
                    settingsNavs.map((nav, index) => (
                        <li
                            onClick={() => setSelectedValue(nav.value)}
                            key={index}
                            className={`${selectedValue === nav.value ? "before:content-[] before:absolute before:w-0.75 before:h-full before:bg-primary-color before:top-0 before:left-0" : ""} ${optionClassName} px-5`}
                        >
                            <nav.Icon
                                size={23}
                                strokeWidth={1.6}
                                className="shrink-0"
                            />
                            <span className={optionTextClassName}>{nav.title}</span>
                        </li>
                    ))
                }
            </div>
            {
                selectedValue
                    ?
                    null
                    :
                    <div className={`min-[700px]:hidden ${containerClassName}`}>
                        {
                            settingsNavs.map((nav, index) => (
                                <li
                                    onClick={() => setSelectedValue(nav.value)}
                                    key={index}
                                    className={`${optionClassName}`}
                                >
                                    <nav.Icon
                                        size={23}
                                        strokeWidth={1.6}
                                        className="shrink-0"
                                    />
                                    <span className={optionTextClassName}>{nav.title}</span>
                                </li>
                            ))
                        }
                    </div>
            }

        </>
    )

}

export default SettingsNavBar