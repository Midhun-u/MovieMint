import style from '../../styles/pages/movies.module.scss'
import MovieList from '../movies/MovieList'
import PageDetails from '../ui/PageDetails'

const Movies = () => {

    return (

        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Movies'
                about='This section allows to see the movie list which added by admin'
                backButton={false}
            />

            <MovieList
            />
        </div>

    )

}

export default Movies