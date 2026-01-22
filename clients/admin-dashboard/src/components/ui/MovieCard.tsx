import style from '../../styles/ui/movieCard.module.scss'
import poster from './poster.jpg'

const MovieCard = () => {

    return (

        <div className={style.container}>
            {/* Movie poster section */}
            <div className={style['image-container']}>
                <img
                    src={poster}
                    className={style['movie-poster']}
                />
            </div>
            {/* Movie details section */}
            <div className={style['movie-details']}>
                {/* Movie title */}
                <h2 className={style['movie-title']}>
                    Demon Slayer: Infinity castel
                </h2>
                {/* Movie certificate and language */}
                <p className={style['movie-other-details']}>
                    UA16+ | English
                </p>
                {/* Movie categories */}
                <p className={style['movie-category']}>
                    Action, Adventure, Supernatural
                </p>
            </div>
        </div>

    )

}

export default MovieCard