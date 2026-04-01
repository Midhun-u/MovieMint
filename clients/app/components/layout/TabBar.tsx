'use client'

import { Dispatch, SetStateAction } from "react"

interface TabBarProps {
    navs: Array<{ title: string, value: string }>
    setValue: Dispatch<SetStateAction<string>>
    selectedValue: string
}

const TabBar = ({ navs, setValue, selectedValue }: TabBarProps) => {

    return (

        <div className="w-full p-1.5 rounded-4xl bg-foreground-color border border-foreground-theme-color/15 overflow-x-auto">
            <ul className="flex gap-2.5 w-min">
                {
                    navs.map((nav, index) => (
                        <li
                            key={index}
                            className={`${selectedValue === nav.value ? "bg-primary-color text-dark-foreground-color" : ""} text-[0.8rem] font-medium p-[0.5px] cursor-pointer rounded-4xl min-w-25 flex justify-center items-center scroll-smooth transition-all duration-200`}
                            onClick={() => setValue(nav.value)}
                        >
                            {
                                nav.title
                            }
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default TabBar