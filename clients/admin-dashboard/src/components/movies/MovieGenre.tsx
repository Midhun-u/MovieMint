import { movieCategories } from "../../utils/movieCategories"
import style from '../../styles/movies/screen.module.scss'
import { useContext, useEffect, useState } from "react"
import { FilterProvider } from "./MovieFilter"
import CheckBoxList from "../ui/CheckBoxList"

const MovieGenre = () => {

    const filterContext = useContext(FilterProvider)
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {

        setRender(true)

        return () => setRender(false)
        
    }, []) 
    
    return (
        
        render
        ?
        <CheckBoxList
            checkedValues={filterContext?.categories? filterContext.categories: []}
            values={movieCategories}
            selectedLimit={4}
            setValues={filterContext?.setCategories ? filterContext.setCategories : null}
            className={style.container}
        />
        :
        <></>
    )

}

export default MovieGenre