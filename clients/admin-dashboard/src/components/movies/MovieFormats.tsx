import { movieFormats } from '../../utils/movieFormats'
import style from '../../styles/movies/screen.module.scss'
import { useContext, useEffect, useState } from 'react'
import { FilterProvider } from './MovieFilter'
import CheckBoxList from '../ui/CheckBoxList'

const MovieFormats = () => {

    const filterContext = useContext(FilterProvider)
    const checkedValues = filterContext?.formats || []
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {

        setRender(true)

        return () => setRender(false)

    }, [])

    return (
        render
        ?
        <CheckBoxList
            checkedValues={checkedValues}
            values={movieFormats}
            selectedLimit={null}
            setValues={filterContext?.setFormats ? filterContext.setFormats : null}
            className={style.container}
        />
        :
        <></>
    )

}

export default MovieFormats