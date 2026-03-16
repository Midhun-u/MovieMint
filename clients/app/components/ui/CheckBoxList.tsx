import type { Dispatch, SetStateAction } from 'react'
import CustomCheckBox from './CustomCheckBox'

interface CheckBoxListProps {
    values: Array<string>
    setValues: Dispatch<SetStateAction<Array<string>>> | null
    checkedValues: Array<string>
    selectedLimit: number | null
    className?: string
}

const CheckBoxList = ({ values, setValues, checkedValues, selectedLimit, className }: CheckBoxListProps) => {

    // Function for adding unchecked value to array
    const handlAddCategories = (unCheckedValue: string) => {

        if(selectedLimit && checkedValues.length <= selectedLimit - 1 && setValues){
            setValues((prevValues) => [...prevValues, unCheckedValue])

        }else if(setValues){
            // Removing category for maintaining length of categories
            const filteredValues = checkedValues.filter((_, index) => selectedLimit? index <= selectedLimit - 1: true)
            setValues([...filteredValues, unCheckedValue])
        }
       

    }

    // Function for removing checked value from array
    const handleRemoveCategories = (checkedValue: string) => {

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
                        onMarkChecked={(unCheckedValue) => handlAddCategories(unCheckedValue)}
                        onUnmarkChecked={(checkedValue) => handleRemoveCategories(checkedValue)}
                        defaultChecked={checkedValues.includes(value)? true: false}
                    />
                ))
            }
        </div>
    )

}

export default CheckBoxList