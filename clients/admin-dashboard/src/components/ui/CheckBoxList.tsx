import type { Dispatch, SetStateAction } from 'react'
import style from '../../styles/addMovies/checkBoxList.module.scss'
import CheckBox from './CheckBox'

interface CheckBoxListProps {
    values: Array<string>
    setValues: Dispatch<SetStateAction<Array<string>>>
    checkedValues: Array<string>
    selectedLimit: number | null
}

const CheckBoxList = ({ values, setValues, checkedValues, selectedLimit }: CheckBoxListProps) => {

    // Function for adding unchecked value to array
    const handlAddCategories = (unCheckedValue: string) => {

        if(selectedLimit && checkedValues.length <= selectedLimit - 1){
            setValues((prevValues) => [...prevValues, unCheckedValue])

        }else{
            // Removing category for maintaining length of categories
            const filteredValues = checkedValues.filter((_, index) => selectedLimit? index <= selectedLimit - 1: true)
            setValues([...filteredValues, unCheckedValue])
        }
       

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
                        checkedValue={checkedValues[checkedValues.indexOf(value)] || ""}
                    />
                ))
            }
        </div>
    )

}

export default CheckBoxList