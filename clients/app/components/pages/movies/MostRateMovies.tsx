'use client'

import { getMovieDetailsBatch } from "@/api/movie"
import { getMostRatingsApi } from "@/api/rate"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearState, movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { Activity, useCallback, useEffect } from "react"
import MovieCard from "./MovieCard"
import MovieSkeleton from "./MovieSkeleton"

const MostRatedMovies = () => {

    const dispatch = useAppDispatch()
    const { movies, loading } = useAppSelector(state => state.movie)

    // Function for fetching most rated movies
    const handleFetchMostRatedMovies = useCallback(async () => {

        dispatch(movieRequest())
        const result = await getMostRatingsApi()
        if (result.success) {

            const movieIds = result.mostRatings?.map((mostRate: { movie_id: string, total_ratings: string }) => mostRate.movie_id)
            const movieResult = await getMovieDetailsBatch(movieIds)

            dispatch(movieSuccess({ movies: movieResult.movies }))

        } else {
            dispatch(movieFailed({ errorMessage: result.error }))
        }

    }, [dispatch])

    useEffect(() => {
        handleFetchMostRatedMovies()

        return () => {
            dispatch(clearState())
        }
    }, [handleFetchMostRatedMovies, dispatch])

    return (
        <div className="grid grid-cols-[repeat(4,auto)] max-[900px]:grid-cols-[repeat(3,auto)] place-items-start justify-start gap-2.5 overflow-scroll">
            {
                movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        id={movie._id}
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
                    Array(3).fill("").map((_, index) => (
                        <MovieSkeleton
                            key={index}
                        />
                    ))
                }
            </Activity>
        </div>
    )
}

export default MostRatedMovies