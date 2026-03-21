'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
    ArrowLeft as BackIcon,
    Star as RatingsIcon,
    Clock as DurationIcon,
    Calendar as DateIcon,
    Grid3x2 as CertificateIcon,
    LanguagesIcon,
    Drama as CategoriesIcon,
    TicketIcon,
    PlayIcon,
    Bookmark as SaveIcon,
    BellRing as NotifyIcon,
    X as CloseIcon
} from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"
import { useCallback, useContext, useEffect, useState } from "react"
import { savedListFailed, savedListRequest, savedListSuccess } from "@/store/savedListSlice"
import { addMovieToSavedListApi, deleteSavedItemApi, getSavedItemApi } from "@/api/savedList"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import { clearState } from "@/store/bannerSlice"
import { movieRatingsConvertor } from "@/utils/movieRatingsConvertor"
import { ratingsTimer } from "@/utils/ratingsTrimer"
import { addNotificationApi, deleteNotificationApi, getMovieNotificationApi } from "@/api/notification"
import { clearNotificationState, notificationFailed, notificationRequest, notificationSuccess } from "@/store/notificationSlice"

const detailsContainerClassName = "flex items-center gap-1.5"
const detailsTextClassName = "font-medium max-h-12"
const buttonClassName = "bg-foreground-color border border-disable-color text-foreground-theme-color hover:bg-background-color"
const buttonTextClassName = "text-xs font-medium"

interface MovieDetailsBannerProps {
    movieId: string
    showRateButton: boolean
}

const MovieDetailsBanner = ({ movieId, showRateButton }: MovieDetailsBannerProps) => {

    const router = useRouter()
    const { movie } = useAppSelector(state => state.movie)
    const { user } = useAppSelector(state => state.auth)
    const { loading: notificationLoading, notification } = useAppSelector(state => state.notification)
    const { savedItem, loading: savedListLoading } = useAppSelector(state => state.savedList)
    const [showTrailerScreen, setShowTrailerScreen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const toastContext = useContext(ToastProvider)

    // Function for adding movie to saved list
    const handleAddMovieToSavedList = async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(savedListRequest())
        const result = await addMovieToSavedListApi(movieId as string, authToken)
        if (result.success) {
            dispatch(savedListSuccess({ savedItem: result?.newSavedItem }))
            toastContext?.triggerToastMessage("Movie added to saved list", "SUCCESS")
        } else {
            dispatch(savedListFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }

    }

    // Function for fetching movie from saved list
    const handleFetchSavedItem = useCallback(async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(savedListRequest())
        const result = await getSavedItemApi(movieId as string, authToken)

        if (result.success) {
            dispatch(savedListSuccess({ savedItem: result.savedItem }))
        } else {
            dispatch(savedListFailed({ errorMessage: result.error }))
        }

    }, [movieId, dispatch])

    // Function for removing movie from saved list
    const handleRemoveSavedItem = async () => {

        if (!savedItem) return

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(savedListRequest())
        const result = await deleteSavedItemApi(savedItem?._id, authToken)
        if (result.success) {
            dispatch(savedListSuccess({ savedItem: null }))
            toastContext?.triggerToastMessage("Movie is removed from saved list", "SUCCESS")
        } else {
            dispatch(savedListFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }


    }

    // Function for adding notification
    const handleAddNotification = async () => {

        if (!user || !movie) return

        dispatch(notificationRequest())
        const result = await addNotificationApi({
            userId: user.id,
            success: true,
            title: `${movie.title} movie is released`,
            message: "Get the best seats in the house! Tap to check showtimes and book your tickets now.",
            metadata: {
                action: "check_movie",
                movie_id: movie._id
            },
            type: "movie",
            availableDate: movie.release_date
        })
        if (result.success) {
            toastContext?.triggerToastMessage("Successfully notified", "SUCCESS")
            dispatch(notificationSuccess({ notification: result.notification }))
        } else {
            dispatch(notificationFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
        }
    }

    // Function for fetching user notification
    const handleFetchNotification = useCallback(async () => {

        const authToken = localStorage.getItem('authToken')
        if (!authToken) return

        dispatch(notificationRequest())

        const result = await getMovieNotificationApi(movieId, authToken)
        if (result.success) {
            dispatch(notificationSuccess({ notification: result.notification }))
        } else {
            dispatch(notificationFailed({ errorMessage: result.error }))
        }

    }, [dispatch, movieId])

    // Function for deleting notification
    const handleDeleteNotification = async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken || !notification) return

        dispatch(notificationRequest())
        const result = await deleteNotificationApi(notification.id, authToken)
        if (result.success) {
            dispatch(notificationSuccess({ notification: null }))
            toastContext?.triggerToastMessage("Removed the notification", "SUCCESS")
        } else {
            dispatch(notificationFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
        }

    }

    useEffect(() => {
        (() => {
            if (movieId) {
                handleFetchSavedItem()
                handleFetchNotification()
            }
        })()

        return () => {
            dispatch(clearState())
            dispatch(clearNotificationState())
        }
    }, [
        movieId,
        handleFetchSavedItem,
        handleFetchNotification,
        dispatch
    ])

    return (
        movie
            ?
            <>
                <div className="absolute top-20 left-5 z-1 cursor-pointer hover:bg-white/20 rounded-full">
                    <BackIcon
                        className="stroke-disable-color"
                        size={25}
                        onClick={() => router.back()}
                    />
                </div>
                {/* Movie details */}
                <div className="w-full flex justify-center px-1 h-150 overflow-hidden relative">
                    {
                        movie?.banner.image_url
                            ?
                            // Banner image
                            <div className="w-full h-full absolute left-0 top-0 -z-1">
                                <Image
                                    src={movie.banner.image_url}
                                    alt={`${movie.title} poster image`}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover aspect-4/2 object-center"
                                />
                                {/* Background */}
                                <div className="w-full h-full absolute top-0 left-0 bg-black z-0 opacity-[0.5]"></div>
                            </div>
                            :
                            null
                    }
                    <div className="max-[600px]:w-full z-2 w-[80%] h-full  flex items-center">
                        <div className="max-[700px]:w-[80%] max-[600px]:w-full items-start flex gap-2.5">
                            {/* Movie poster */}
                            {
                                movie?.poster
                                    ?
                                    <Image
                                        src={movie.poster.image_url}
                                        alt={`${movie.title} poster image`}
                                        width={1000}
                                        height={1000}
                                        className="max-[800px]:hidden h-110 w-auto z-1"
                                        loading="eager"
                                    />
                                    :
                                    null
                            }
                            {/* Movie details */}
                            <div className="max-[500px]:w-full max-[600px]:w-[80%] w-full max-[600px]:pt-3 px-5 flex flex-col h-full text-white/70 gap-2.5 z-1">
                                {/* Movie title */}
                                <h1 className="text-white text-xl font-bold max-h-15 overflow-hidden wrap-break-word">{movie.title}</h1>
                                {/* Movie ratings */}
                                {
                                    movie.status === "SHOWING"
                                        ?
                                        <div className={detailsContainerClassName}>
                                            <RatingsIcon
                                                size={19}
                                                className="shrink-0"
                                            />
                                            <p className={detailsTextClassName}>
                                                {ratingsTimer(movie.ratingsDetails?.averageRatings || 0)}
                                                /10
                                                &nbsp;
                                                {
                                                    movieRatingsConvertor(movie.ratingsDetails.totalRatings)
                                                } Ratings
                                            </p>
                                        </div>
                                        :
                                        null
                                }
                                {/* Movie duration */}
                                <div className={detailsContainerClassName}>
                                    <DurationIcon
                                        size={19}
                                        className="shrink-0"
                                    />
                                    <p className={detailsTextClassName}>{movie.duration.hour}H {movie.duration.minutes}M</p>
                                </div>
                                {/* Movie release date */}
                                <div className={detailsContainerClassName}>
                                    <DateIcon
                                        size={19}
                                        className="shrink-0"
                                    />
                                    <p className={detailsTextClassName}>{convertIsoDateToNormalFormat(movie.createdAt)}</p>
                                </div>
                                {/* Movie certificate */}
                                <div className={detailsContainerClassName}>
                                    <CertificateIcon
                                        size={19}
                                        className="shrink-0"
                                    />
                                    <p className={detailsTextClassName}>{movie.certificate}</p>
                                </div>
                                {/* Movie language */}
                                <div className={detailsContainerClassName}>
                                    <LanguagesIcon
                                        size={19}
                                        className="shrink-0"
                                    />
                                    <p className={detailsTextClassName}>{movie.language}</p>
                                </div>
                                {/* Movie categories */}
                                <div className={detailsContainerClassName}>
                                    <CategoriesIcon
                                        size={19}
                                        className="shrink-0"
                                    />
                                    <p className={detailsTextClassName}>{movie.categories.join(", ")}</p>
                                </div>
                                {
                                    movie.status === "SHOWING"
                                        ?
                                        <div className="flex flex-col gap-2">
                                            <Button className="mt-2.5">
                                                <TicketIcon
                                                />
                                                <span className={buttonTextClassName}>Book Tickets</span>
                                            </Button>
                                            <Button
                                                className={buttonClassName}
                                                onClick={() => setShowTrailerScreen(true)}
                                            >
                                                <PlayIcon
                                                />
                                                <span className={buttonTextClassName}>Watch Trailer</span>
                                            </Button>
                                            {
                                                savedItem
                                                    ?
                                                    <Button
                                                        className={buttonClassName}
                                                        disabled={savedListLoading}
                                                        onClick={handleRemoveSavedItem}
                                                    >
                                                        <SaveIcon
                                                            className="fill-foreground-theme-color stroke-foreground-theme-color"
                                                        />
                                                        <span>Saved</span>
                                                    </Button>
                                                    :
                                                    <Button
                                                        className={buttonClassName}
                                                        onClick={handleAddMovieToSavedList}
                                                        disabled={savedListLoading}
                                                    >
                                                        <SaveIcon
                                                        />
                                                        <span className={buttonTextClassName}>Save</span>
                                                    </Button>

                                            }
                                            {
                                                showRateButton
                                                    ?
                                                    <Button
                                                        className={buttonClassName}
                                                        onClick={() => router.push(`/movies/ratings/${movieId}`)}
                                                    >
                                                        <RatingsIcon
                                                        />
                                                        <span className={buttonTextClassName}>Rate</span>
                                                    </Button>
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        <div className="w-full flex flex-col gap-2">
                                            {
                                                notification
                                                    ?
                                                    <Button
                                                        onClick={handleDeleteNotification}
                                                    >
                                                        <NotifyIcon
                                                            className="fill-dark-foreground-color"
                                                        />
                                                        <span className={buttonTextClassName}>Notified</span>
                                                    </Button>
                                                    :
                                                    <Button
                                                        onClick={handleAddNotification}
                                                        disabled={notificationLoading}
                                                    >
                                                        <NotifyIcon
                                                        />
                                                        <span className={buttonTextClassName}>Notify</span>
                                                    </Button>
                                            }
                                            <Button
                                                className={buttonClassName}
                                                onClick={() => setShowTrailerScreen(true)}
                                            >
                                                <PlayIcon
                                                />
                                                <span className={buttonTextClassName}>Watch Trailer</span>
                                            </Button>
                                            {
                                                savedItem
                                                    ?
                                                    <Button
                                                        className={buttonClassName}
                                                        disabled={savedListLoading}
                                                        onClick={handleRemoveSavedItem}
                                                    >
                                                        <SaveIcon
                                                            className="fill-foreground-theme-color stroke-foreground-theme-color"
                                                        />
                                                        <span>Saved</span>
                                                    </Button>
                                                    :
                                                    <Button
                                                        className={buttonClassName}
                                                        onClick={handleAddMovieToSavedList}
                                                        disabled={savedListLoading}
                                                    >
                                                        <SaveIcon
                                                        />
                                                        <span className={buttonTextClassName}>Save</span>
                                                    </Button>

                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showTrailerScreen
                        ?
                        <div className="w-full top-10 px-3 flex justify-center h-full z-5 absolute">
                            {/* Background */}
                            <div className="w-full h-full absolute bg-foreground-color opacity-[0.6]"></div>
                            {/* Movie trailer screen */}
                            <div className="max-[800px]:w-[calc(100%-12px)] top-45 w-170 border border-foreground-theme-color/15 flex flex-col gap-3 h-min fixed rounded-md p-5 pt-3 bg-foreground-color">
                                <div className="flex relative justify-between h-min items-center gap-5">
                                    <span className="max-[800px]:w-[80%] font-medium text-md max-h-6 overflow-hidden break-all w-[50%]">{movie.title}</span>
                                    <div onClick={() => setShowTrailerScreen(false)} className="p-1 rounded-full hover:bg-foreground-theme-color/10 cursor-pointer">
                                        <CloseIcon
                                            size={22}
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-full">
                                    <iframe
                                        src={movie.movie_trailer}
                                        className="w-full aspect-video"
                                        title={`${movie.title} trailer`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </>
            :
            null
    )

}

export default MovieDetailsBanner