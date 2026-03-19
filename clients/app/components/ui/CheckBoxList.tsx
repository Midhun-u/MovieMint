import type { Dispatch, SetStateAction } from 'react'
import CustomCheckBox from './CustomCheckBox'

interface CheckBoxListProps {
    values: Array<string>
    setValues: Dispatch<SetStateAction<Array<string>>> | null
    checkedValues: Array<string>
    maxlength: number | null
    className?: string
}

const CheckBoxList = ({ values, setValues, checkedValues, maxlength, className }: CheckBoxListProps) => {

    // Function for adding unchecked value to array
    const handleAddValue = (unCheckedValue: string) => {

        if(maxlength && checkedValues.length <= maxlength - 1 && setValues){
            setValues((prevValues) => {
                if(prevValues.includes(unCheckedValue)){
                    return prevValues
                }else{
                    return [...prevValues, unCheckedValue]
                }
            })

        }else if(setValues){
            // Removing category for maintaining max length
            const filteredValues = checkedValues.filter((_, index) => maxlength? index <= maxlength - 1: true)
            setValues([...filteredValues, unCheckedValue])
        }

    }

    // Function for removing checked value from array
    const handleRemoveValue = (checkedValue: string) => {
        if(!setValues) return

        const filteredList = checkedValues.filter((value) => value !== checkedValue)
        setValues(filteredList)

    }

    return (
        <div className={`flex flex-wrap mt-2 gap-2 ${className}`}>
            {
                values?.map((value, index) => (
                    <CustomCheckBox
                        value={value}
                        key={index}
                        onMarkChecked={(unCheckedValue) => handleAddValue(unCheckedValue)}
                        onUnmarkChecked={(checkedValue) => handleRemoveValue(checkedValue)}
                        defaultChecked={checkedValues.includes(value)? true: false}
                        checked={checkedValues.includes(value)}
                    />
                ))
            }
        </div>
    )

}

export default CheckBoxList