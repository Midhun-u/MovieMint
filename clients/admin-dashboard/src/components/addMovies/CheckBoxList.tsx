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

        if(checkedValues.length <= 4){
            setValues((prevValues) => [...prevValues, unCheckedValue])

        }else{
            // Removing category for maintaining length of categories
            const filteredValues = checkedValues.filter((_, index) => index <= 3)
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