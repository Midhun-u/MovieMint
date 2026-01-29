import { Activity, useState } from 'react'
import style from '../../styles/ui/checkBox.module.scss'
import {
    CheckIcon
} from 'lucide-react'

interface CheckBoxProps {
    value: string
    onMarkChecked?: (value: string) => void
    onUnmarkChecked?: (value: string) => void
    checkedValue: string
}

const CheckBox = ({ value, onMarkChecked, onUnmarkChecked, checkedValue }: CheckBoxProps) => {

    const [checked, setChecked] = useState<boolean>(false)

    // Function for marking checked or unmarking
    const onClick = () => {

        setChecked(!checked)

        if (onMarkChecked && !checked) {
            onMarkChecked(value)
        } else if (onUnmarkChecked && checked) {
            onUnmarkChecked(value)
        }
    }

    return (
        <div className={style.container}>
            <div
                className={checked && value === checkedValue ? style['checkbox-checked'] : style.checkbox}
                onClick={onClick}
            >
                <Activity mode={checked && value === checkedValue ? "visible" : "hidden"}>
                    <CheckIcon
                        size={12}
                        strokeWidth={2}
                        className={style.icon}
                    />
                </Activity>
            </div>
            <span
                onClick={onClick}
            >
                {value}
            </span>
        </div>
    )

}

export default CheckBox