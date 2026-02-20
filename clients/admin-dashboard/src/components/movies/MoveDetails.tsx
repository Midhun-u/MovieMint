import { useEffect, useState } from 'react'
import style from '../../styles/movies/movieDetails.module.scss'
import { getMovieApi } from '../../api/movie'
import type { MovieData } from '@/types/movie'
import Button from '../ui/Button'

interface MovieDetails {
    movieId: string
    onClickOnClose: () => void
}

const MovieDetails = ({ movieId, onClickOnClose }: MovieDetails) => {

    const [movieDetails, setMovieDetails] = useState<MovieData | null>(null)

    // Function for fetching movie details
    const handleFetchMovieDetails = async () => {

        const result = await getMovieApi(movieId)
        if(result.success){
            setMovieDetails(result.movie)
        }

    }

    useEffect(() => {
        if (movieId) {
            handleFetchMovieDetails()
        }
    }, [movieId])

    return (

        movieDetails
        ?
        <div className={style.container}>
            {/* Movie banner */}
            <img
                src={movieDetails.banner.image_url}
                className={style.banner}
            />
            {/* Movie details */}
            <div className={style.details}>
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.synopsis}</p>
            </div>
            {/* Buttons */}
            <div className={style['button-container']}>
                <Button
                    title='Close'
                    onClick={onClickOnClose}
                />
                <Button
                    title='Add To Banner'
                />
            </div>
        </div>
        :
        null

    )

}

export default MovieDetails