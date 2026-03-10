'use client'

import { getMoviesApi } from "@/api/movie"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useCallback, useEffect } from "react"

const MovieList = () => {

    const {pagination, movies} = useAppSelector(state => state.movie)
    const dispatch = useAppDispatch()

    // Function for fetching movies
    const handleFetchMovies = useCallback(async () => {
        dispatch(movieRequest())

        const result = await getMoviesApi(pagination.page, pagination.limit)
        if(result.success){
            dispatch(movieSuccess({movies: result.movies}))
        }else{
            dispatch(movieFailed({errorMessage: result.errorMessage}))
        }
    }, [dispatch, pagination.page, pagination.limit])

    useEffect(() => {
        handleFetchMovies()
    }, [handleFetchMovies])

    return (

        <div>Hello world</div>

    )

}

export default MovieList