import style from '../../styles/addShows/movieSkeleton.module.scss'

const MovieSkeleton = () => {

    return (
        <div className={style.container}>
            <div className={style['image-ui']}></div>
            <div className={style['details-ui']}>
                <div className={style.title}></div>
                <div className={style['other-details-ui']}></div>
                <div className={style['other-details-ui']}></div>
            </div>
        </div>
    )

}

export default MovieSkeleton