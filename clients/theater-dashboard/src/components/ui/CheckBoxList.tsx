import { useState, type Dispatch, type SetStateAction } from 'react'
import CheckBox from './CheckBox'

interface CheckBoxListProps {
    values: Array<string>
    setValues: Dispatch<SetStateAction<Array<string>>> | null
    checkedValues: Array<string>
    selectedLimit: number | null
    className?: string
}

const CheckBoxList = ({ values = [], setValues, checkedValues, selectedLimit, className }: CheckBoxListProps) => {

    const [checkedValuesState, setCheckedValuesState] = useState<Array<string>>(checkedValues)

    // Function for adding unchecked value to array
    const handleAddValue = (value: string) => {

        if (selectedLimit && checkedValuesState.length < selectedLimit && setValues) {

            setCheckedValuesState((pre) => [...pre, value])
            setValues((pre) => [...pre, value])

        } else if (setValues) {

            // Removing last element in checked values to maintain length
            if (!selectedLimit) {
                setCheckedValuesState((pre) => [...pre, value])
                setValues((pre) => [...pre, value])
            }else{

                const filteredCheckedValues = checkedValuesState.filter((_, index) => index <= selectedLimit - 1)
                setCheckedValuesState([...filteredCheckedValues, value])
                setValues([...filteredCheckedValues, value])

            }

        }


    }

    // Function for removing checked value from array
    const handleRemoveValue = (unCheckedValue: string) => {

        if (setValues) {

            const filteredCheckedValues = checkedValuesState.filter((value) => value !== unCheckedValue)
            setCheckedValuesState(filteredCheckedValues)
            setValues(filteredCheckedValues)

        }

    }

    return (
        <div className={className}>
            {
                values.map((value, index) => (
                    <CheckBox
                        value={value}
                        key={index}
                        onMarkChecked={(checkedValue) => handleAddValue(checkedValue)}
                        onUnmarkChecked={(unCheckedValue) => handleRemoveValue(unCheckedValue)}
                        defaultChecked={checkedValuesState.includes(value)}
                        checkedValue={checkedValuesState.find((checkedValue) => checkedValue === value)}
                    />
                ))
            }
        </div>
    )

}

export default CheckBoxList