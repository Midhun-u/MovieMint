import { forwardRef, type InputHTMLAttributes } from 'react'
import style from '../../styles/ui/searchBar.module.scss'
import Input from '../ui/Input'
import {
    SearchIcon
} from 'lucide-react'

interface SearchBarInputProps extends InputHTMLAttributes<HTMLElement>{}

const SearchBarInput = forwardRef<HTMLInputElement, SearchBarInputProps>(({...props}, ref) => {

    return (

        <div className={style['container']}>
            <SearchIcon
                size={20}
                className={style.icon}
            />
            <Input
                className={style.input}
                type='text'
                placeholder='Search for movies by title'
                {...props}
                ref={ref}
            />
        </div>

    )

})

export default SearchBarInput