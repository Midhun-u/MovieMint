import { Activity, useEffect, useState } from 'react'
import style from '../../styles/movies/movieList.module.scss'
import { getMoviesApi } from '../../api/movie'
import SearchBarInput from '../ui/SearchBar'
import MovieFilter from './MovieFilter'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { movieFailed, movieRequest, movieSuccess } from '../../store/movieSlice'
import MovieCard from './MovieCard'
import MovieSkeleton from './MovieSkeleton'
import useObserver from '../hooks/useObserver'
import NoResult from '../ui/NoResult'

const MovieList = () => {

    const { loading, movies } = useAppSelector(state => state.movie)
    const [pagination, setPagination] = useState<{
        page: number
        limit: number
    }>({
        page: 1,
        limit: 1,
    })
    const dispatch = useAppDispatch()
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [hasMore, setHasMore] = useState<boolean>(false)

    // Function for fetching movies
    const handleFetchMovies = async () => {

        dispatch(movieRequest())
        const result = await getMoviesApi(pagination.page, pagination.limit)

        if (result.success) {

            const movieList = pagination.page === 1 || movies.length <= 0 ? result.movies : [...movies, ...result.movies]
            dispatch(movieSuccess({ movies: movieList }))

            if(result.movies?.length < pagination.limit){
                setHasMore(false)
            }else{
                setHasMore(true)
            }

        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }

    }

    useEffect(() => {

        if (!isIntersecting || loading || !hasMore) return

        setPagination((pre) => {
            return { ...pre, page: pre.page + 1 }
        })

    }, [isIntersecting, hasMore, loading])

    useEffect(() => {
        handleFetchMovies()
    }, [pagination.page])

    return (

        <div className={style.container}>
            <div className={style['search-container']}>
                <SearchBarInput
                />
                <MovieFilter
                />
            </div>
            {
                movies.length
                    ?
                    <>
                        {/* List of movies */}
                        <div className={style['list']}>
                            {
                                movies.map((movie) => (
                                    <MovieCard
                                        key={movie._id}
                                        title={movie.title}
                                        poster={movie.poster.image_url}
                                        categories={movie.categories}
                                        certificate={movie.certificate}
                                        language={movie.language}
                                    />
                                ))
                            }
                            <Activity mode={loading ? "visible" : "hidden"}>
                                {
                                    Array(3).fill(null).map((_, index) => (

                                        <MovieSkeleton
                                            key={index}
                                        />

                                    ))
                                }
                            </Activity>
                            <Activity mode={hasMore ? "visible" : "hidden"}>
                                <div ref={ref}></div>
                            </Activity>
                        </div>
                    </>
                    :
                    <NoResult
                    />
            }
        </div>

    )

}

export default MovieList