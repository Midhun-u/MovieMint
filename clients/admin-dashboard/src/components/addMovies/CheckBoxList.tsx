import type { Dispatch, SetStateAction } from 'react'
import style from '../../styles/addMovies/checkBoxList.module.scss'
import CheckBox from '../ui/CheckBox'

interface CheckBoxListProps {
    values: Array<string>
    setValues: Dispatch<SetStateAction<Array<string>>>
    checkedValues: Array<string>
}

const CheckBoxList = ({ values, setValues, checkedValues }: CheckBoxListProps) => {

    // Function for adding unchecked value to array
    const handlAddCategories = (unCheckedValue: string) => {

        setValues((prevValues) => [...prevValues, unCheckedValue])

    }

    // Function for removing checked value from array
    const handleRemoveCategories = (checkedValue: string) => {

        const filteredList = checkedValues.filter((value) => value !== checkedValue)
        setValues(filteredList)

    }

    return (
        <div className={style.container}>
            {
                values?.map((value, index) => (
                    <CheckBox
                        value={value}
                        key={index}
                        onMarkChecked={(unCheckedValue) => handlAddCategories(unCheckedValue)}
                        onUnmarkChecked={(checkedValue) => handleRemoveCategories(checkedValue)}
                    />
                ))
            }
        </div>
    )

}

export default CheckBoxList