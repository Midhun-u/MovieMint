import { movieLanguages } from '../../utils/movieLanguages'
import style from '../../styles/movies/screen.module.scss'
import { useContext, useEffect, useState } from 'react'
import Radio from '../ui/Radio'
import { FilterProvider } from '../context/providers/FilterContext'

const MovieLanguage = () => {

    const filterContext = useContext(FilterProvider)
    const checkedValues = filterContext?.language || ""
    const radioValues = movieLanguages.map((language) => {
        return { title: language, value: language }
    })
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {
        setRender(true)
        return () => setRender(false)
    }, [])

    return (
        render
        ?
        <Radio
            values={radioValues}
            onClick={({ title, value }) => filterContext?.setLanguage ? filterContext.setLanguage(value) : null}
            selectedValue={checkedValues}
            className={style.container}
        />
        :
        <></>
    )

}

export default MovieLanguage