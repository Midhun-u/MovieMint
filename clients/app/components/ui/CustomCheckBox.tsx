import { Checkbox } from '../ui/checkbox'

interface CustomCheckBoxProps {
    value: string
    onMarkChecked?: (value: string) => void
    onUnmarkChecked?: (value: string) => void
    defaultChecked?: boolean
    checked: boolean
}

const CustomCheckBox = ({ value, onMarkChecked, onUnmarkChecked, defaultChecked, checked }: CustomCheckBoxProps) => {

    // Function for marking checked or unmarking
    const onClick = () => {

        if (onMarkChecked && !checked) {
            onMarkChecked(value)
        } else if (onUnmarkChecked && checked) {
            onUnmarkChecked(value)
        }
    }

    return (
        <div className="flex gap-2 items-center text-sm font-medium">
            <div
                className={`flex items-center justify-center w-3.75 h-3.75 bg-foreground-color border rounded-xs cursor-pointer`}
            >
                <Checkbox
                    className='cursor-pointer'
                    onClick={onClick}
                    defaultChecked={defaultChecked}
                />
            </div>
            <span
                className='cursor-pointer'
            >
                {value}
            </span>
        </div>
    )

}

export default CustomCheckBox