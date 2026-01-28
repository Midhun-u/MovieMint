import type { LucideReactIconType } from '@/types/lucideReactType'
import style from '../../styles/addMovies/listitems.module.scss'
import FormLabel from '../form/FormLabel'
import DropDownMenu from '../ui/DropDownMenu'
import type { Dispatch, SetStateAction } from 'react'

interface ListItemsProps{
    labelTitle: string
    Icon: LucideReactIconType
    values: Array<string>
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const ListItems = ({labelTitle, Icon, values, value, setValue}: ListItemsProps) => {

    return (

        <div className={style.container}>
            <FormLabel title={labelTitle} />
            <DropDownMenu
                Icon={Icon}
                values={values}
                value={value}
                setValue={setValue}
            />
        </div>
    )

}

export default ListItems