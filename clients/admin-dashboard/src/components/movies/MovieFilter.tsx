import style from '../../styles/movies/movieFilter.module.scss'
import {
    Settings2 as FilterIcon,
    ChevronDown as DownArrowIcon
} from 'lucide-react'

const MovieFilter = () => {

    return (
        <div className={style.container}>
            <FilterIcon
                className={style.icon}
                size={15}
            />
            <span>Filter</span>
            <DownArrowIcon
                className={style.icon}
                size={15}
            />
        </div>
    )

}

export default MovieFilter