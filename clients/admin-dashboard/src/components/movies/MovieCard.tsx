import style from '../../styles/movies/movieCard.module.scss'

interface MovieCardProps{
    poster: string
    title: string
    certificate: string
    language: string
    categories: Array<string>
}

const MovieCard = ({poster, title, certificate, language, categories}: MovieCardProps) => {

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
                    {title}
                </h2>
                {/* Movie certificate and language */}
                <p className={style['movie-other-details']}>
                    {certificate} | {language}
                </p>
                {/* Movie categories */}
                <p className={style['movie-category']}>
                    {categories?.join(", ")}
                </p>
            </div>
        </div>

    )

}

export default MovieCard