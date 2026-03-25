'use client'

import { useParams } from "next/navigation"
import MovieDetailsBanner from "../movies/MovieDetailsBanner"
import { useCallback, useEffect, useState } from "react"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getMovieApi } from "@/api/movie"
import ShowTimeDetails from "./ShowTimeDetails"
import { showFailed, showRequest, showSuccess } from "@/store/showSlice"
import { getAllShowsApi } from "@/api/shows"

const BookingsSection = () => {

    const { movieId } = useParams()
    const { shows, pagination } = useAppSelector(state => state.show)
    const { movie } = useAppSelector(state => state.movie)
    const dispatch = useAppDispatch()
    const [selectedDay, setSelectedDay] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)

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

    // Function for fetching shows
    const handleFetchShows = useCallback(async () => {

        dispatch(showRequest())

        const result = await getAllShowsApi(movieId as string, pagination.page, pagination.limit)
        if (result.success) {
            dispatch(showSuccess({ shows: result.shows }))
            if (result.shows?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
        } else {
            dispatch(showFailed({ errorMessage: result.error }))
        }

    }, [movieId, pagination.limit, pagination.page, dispatch])

    useEffect(() => {
        (() => {
            if (movieId) {
                handleFetchMovieDetails()
                handleFetchShows()
            }
        })()
    }, [handleFetchMovieDetails, movieId, handleFetchShows])

    return (
        <div className="w-full mt-15 items-center flex flex-col gap-10">
            <MovieDetailsBanner
                showRateButton
                showBookButton={false}
                movieId={movieId as string}
            />
            {
                movie
                    ?
                    <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full">
                        <ShowTimeDetails
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    </div>
                    :
                    null
            }
        </div>
    )

}

export default BookingsSection