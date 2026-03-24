'use client'

import { getMovieApi } from "@/api/movie"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useParams, useRouter } from "next/navigation"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import MovieDetailsBanner from "../movies/MovieDetailsBanner"
import NoResult from "@/components/ui/NoResult"
import MovieRatingsDetails from "./MovieRatingsDetails"
import PageDetails from "@/components/ui/PageDetails"
import RateForm from "./RateForm"
import { incrementPage, rateFailed, rateRequst, rateSuccess, clearState } from "@/store/rateSlice"
import { deleteRateApi, getRateApi, getRatingsApi } from "@/api/rate"
import RateCard from "./RateCard"
import { Button } from "@/components/ui/button"
import {
    Trash as DeleteIcon,
    EditIcon
} from 'lucide-react'
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import Spinner from "@/components/ui/Spinner"
import useObserver from "@/components/hooks/useObserver"
import RateSkeleton from "./RateSkeleton"

const RatingsSection = () => {

    const dispatch = useAppDispatch()
    const { movie } = useAppSelector(state => state.movie)
    const { rate, pagination, loading, ratings } = useAppSelector(state => state.rate)
    const { user } = useAppSelector(state => state.auth)
    const { theme } = useAppSelector(state => state.theme)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const { movieId } = useParams()
    const toastContext = useContext(ToastProvider)
    const router = useRouter()
    const [editRate, setEditRate] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })

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

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(rateRequst())

        const result = await getRateApi(movieId as string, authToken)
        if (result.success) {
            dispatch(rateSuccess({ rate: result.rate }))
        } else {
            dispatch(rateFailed({ errorMessage: result.error }))
        }

    }, [dispatch, movieId])

    // Function for deleting rate
    const handleDeleteRate = async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken || !rate) return

        dispatch(rateRequst())
        setDeleteLoading(true)
        const result = await deleteRateApi(rate.id, authToken)
        if (result.success) {
            dispatch(rateSuccess({ rate: null }))
            toastContext?.triggerToastMessage("Rate is deleted", "SUCCESS")
        } else {
            dispatch(rateFailed({ errorMessage: result.error }))
        }
        setDeleteLoading(false)

    }

    // Function for getting ratings
    const handleFetchRatings = useCallback(async () => {

        const authToken = localStorage.getItem('authToken')
        if (!authToken) return

        dispatch(rateRequst())

        const result = await getRatingsApi(movieId as string, pagination.page, pagination.limit, authToken)
        if (result.success) {
            dispatch(rateSuccess({ ratings: result.ratings }))
            if (result.ratings?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
        } else {
            dispatch(rateFailed({ errorMessage: result.error }))
        }

    }, [dispatch, pagination.page, pagination.limit, movieId])

    useEffect(() => {

        if (movieId) {
            handleFetchMovieDetails()
            handleFetchUserRate()
        } else {
            router.back()
        }

        return () => {
            dispatch(clearState())
        }
    }, [movieId, handleFetchMovieDetails, handleFetchUserRate, dispatch, router])

    useEffect(() => {
        (() => {
            handleFetchRatings()
        })()

    }, [handleFetchRatings, pagination.page, dispatch])

    useEffect(() => {
        if (!isIntersecting || loading || !hasMore) return;

        dispatch(incrementPage())
    }, [isIntersecting, hasMore, loading, dispatch]);

    return (
        movie
            ?
            <div className="w-full mt-15 items-center flex flex-col gap-10">
                <MovieDetailsBanner
                    movieId={movieId as string}
                    showRateButton={false}
                    showBookButton
                />
                <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-8">
                    <MovieRatingsDetails
                    />
                    <PageDetails
                        title="Rate Your Experience"
                        about="We'd love to hear your feedback"
                        backButton={false}
                    />
                    {
                        rate && user && !editRate
                            ?
                            <div className="max-[600px]:w-full w-112.5 flex flex-col gap-2.5">
                                <div className="max-h-40">
                                    <RateCard
                                        userImage={user.profile_image.image_url}
                                        userName={user.firstname + " " + user.lastname}
                                        userRate={rate.rate}
                                        userComment={rate.comment}
                                        createdAt={rate.createdAt}
                                    />
                                </div>
                                <Button
                                    size={"sm"}
                                    className="bg-foreground-color text-foreground-theme-color hover:bg-red-400 hover:text-white hover:border-red-400 transition-all duration-200 border border-foreground-theme-color/15"
                                    onClick={handleDeleteRate}
                                    disabled={deleteLoading}
                                >
                                    {
                                        deleteLoading
                                            ?
                                            <Spinner
                                                color={theme === "dark" ? "white" : "black"}
                                                size={15}
                                            />
                                            :
                                            <>
                                                <DeleteIcon
                                                />
                                                <>Delete Rate</>
                                            </>
                                    }
                                </Button>
                                <Button
                                    onClick={() => setEditRate(true)}
                                >
                                    <EditIcon
                                    />
                                    <>Edit Rate</>
                                </Button>
                            </div>
                            :
                            <RateForm
                                editRate={editRate}
                                setEditRate={setEditRate}
                            />
                    }
                    {/* Ratings list */}
                    {
                        ratings.length
                            ?
                            <div className="flex flex-col gap-5 mt-5">
                                <h1 className="text-[1rem] font-semibold">Others Reviews & Ratings</h1>
                                <div className="max-[600px]:w-full w-112.5 flex flex-col gap-2.5">
                                    {
                                        ratings.map((rate) => (
                                            <RateCard
                                                key={rate.id}
                                                userRate={rate.rate}
                                                userName={rate.user.firstname + " " + rate.user.lastname}
                                                userImage={rate.profile_image.image_url}
                                                userComment={rate.comment}
                                                createdAt={rate.createdAt}
                                            />
                                        ))
                                    }
                                    <Activity mode={loading ? "visible" : "hidden"}>
                                        {
                                            Array(3).fill("").map((_, index) => (

                                                <div
                                                    className="max-[600px]:w-full w-112.5 flex flex-col gap-2.5"
                                                    key={index}
                                                >
                                                    <RateSkeleton
                                                    />
                                                </div>

                                            ))
                                        }
                                    </Activity>
                                </div>
                                <Activity mode={hasMore && ratings.length ? "visible" : "hidden"}>
                                    <div ref={ref}></div>
                                </Activity>
                            </div>
                            :
                            null
                    }
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