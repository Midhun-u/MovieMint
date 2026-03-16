'use client'

import { getMovieApi } from "@/api/movie"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearState, movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import MovieDetailsBanner from "../movies/MovieDetailsBanner"
import NoResult from "@/components/ui/NoResult"
import MovieRatingsDetails from "./MovieRatingsDetails"
import PageDetails from "@/components/ui/PageDetails"
import RateForm from "./RateForm"

const RatingsSection = () => {

    const dispatch = useAppDispatch()
    const { movie } = useAppSelector(state => state.movie)
    const { movieId } = useParams()
    const router = useRouter()

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

    // Function for fetching user rate
    const handleFetchUserRate = useCallback(async () => {

        

    }, [])

    useEffect(() => {

        if (movieId) {
            handleFetchMovieDetails()
        } else {
            router.back()
        }

        return () => {
            dispatch(clearState())
        }
    }, [movieId, handleFetchMovieDetails, dispatch, router])

    return (
        movie
            ?
            <div className="w-full mt-15 items-center flex flex-col gap-10">
                <MovieDetailsBanner
                    movieId={movieId as string}
                    showRateButton={false}
                />
                <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-8">
                    <MovieRatingsDetails
                    />
                    <PageDetails
                        title="Rate Your Experience"
                        about="We'd love to hear your feedback"
                        backButton={false}
                    />
                    <RateForm
                    />
                </div>
            </div>
            :
            <div className="w-full flex justify-center px-3 mt-10">
                <NoResult
                />
            </div>
    )

}

export default RatingsSection