import { Activity, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import style from '../../styles/ui/dropDownMenu.module.scss'
import {
    ChevronDown as DownArrowIcon
} from 'lucide-react'
import type { LucideReactIconType } from "@/types/lucideReactType"

interface DropDownMenuProps {
    Icon: LucideReactIconType
    values: Array<string>
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const DropDownMenu = ({ Icon, values, value: selectedValue, setValue }: DropDownMenuProps) => {

    const [showMenu, setShowMenu] = useState<boolean>(false)

    useEffect(() => {
        setValue(values[0])
    }, [])

    return (

        <>
            <div className={style.container} onClick={() => setShowMenu(!showMenu)}>
                <div className={style['menu-bar']}>
                    <Icon
                        size={22}
                        strokeWidth={1.5}
                        className={style['icon']}
                    />
                    <span>{selectedValue ? selectedValue : values[0]}</span>
                    <DownArrowIcon
                        size={22}
                        strokeWidth={1.5}
                        className={showMenu ? style['rotate-arrow-icon'] : style['arrow-icon']}
                    />
                </div>
            </div>
            <Activity mode={showMenu ? "visible" : "hidden"}>
                <div className={style['menu']}>
                    {
                        values.map((value, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setValue(value)
                                    setShowMenu(false)
                                }}
                                className={selectedValue === value ? style['active-value'] : ''}
                            >
                                {value}
                            </li>
                        ))
                    }
                </div>
            </Activity>
        </>
    )

}

export default DropDownMenu