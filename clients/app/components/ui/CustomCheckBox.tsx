import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

interface CustomCheckBoxProps {
    value: string
    onMarkChecked?: (value: string) => void
    onUnmarkChecked?: (value: string) => void
    checkedValue: string
}

const CustomCheckBox = ({ value, onMarkChecked, onUnmarkChecked, checkedValue }: CustomCheckBoxProps) => {

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
        <div className="flex gap-2 items-center text-sm font-medium">
            <div
                className={`flex items-center justify-center w-3.75 h-3.75 bg-foreground-color border rounded-xs cursor-pointer `}
                onClick={onClick}
            >

                <Checkbox
                    className='cursor-pointer'
                />
            </div>
            <span
                onClick={onClick}
                className='cursor-pointer'
            >
                {value}
            </span>
        </div>
    )

}

export default CustomCheckBox