'use client'

import { useParams } from "next/navigation"
import MovieDetailsBanner from "../movies/MovieDetailsBanner"
import { useCallback, useEffect } from "react"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useAppDispatch } from "@/store/hooks"
import { getMovieApi } from "@/api/movie"
import ShowTimeDetails from "./ShowTimeDetails"

const BookingsSection = () => {

    const { movieId } = useParams()
    const dispatch = useAppDispatch()
    console.log(movieId)

    // Function for fetching movie details
    const handleFetchMovieDetails = useCallback(async () => {

        dispatch(movieRequest())

        const result = await getMovieApi(movieId as string)
        if (result.success) {
            dispatch(movieSuccess({ movie: result.movie }))
        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }

    }, [movieId, dispatch])

    useEffect(() => {
        handleFetchMovieDetails()
    }, [handleFetchMovieDetails])

    return (
        <div className="w-full mt-15 items-center flex flex-col gap-10">
            <MovieDetailsBanner
                showRateButton
                showBookButton={false}
                movieId={movieId as string}
            />
            <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full">
                <ShowTimeDetails
                />
            </div>
        </div>
    )

}

export default BookingsSection