'use client'

import { getMovieApi, getRecommendedMovies } from "@/api/movie"
import NoResult from "@/components/ui/NoResult"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
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
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"
import { Button } from "@/components/ui/button"
import { getActorsImagesApi } from "@/api/media"
import { MovieData } from "@/types/movie"
import MovieCard from "./MovieCard"
import MovieSkeleton from "./MovieSkeleton"
import { addMovieToSavedListApi, deleteSavedItemApi, getSavedItemApi } from "@/api/savedList"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import { savedListFailed, savedListRequest, savedListSuccess } from "@/store/savedListSlice"

const detailsContainerClassName = "flex items-center gap-1.5"
const detailsTextClassName = "font-medium max-h-12"
const buttonClassName = "bg-foreground-color border border-disable-color text-foreground-theme-color hover:bg-background-color"
const buttonTextClassName = "text-xs font-medium"

const MovieDetails = () => {

    const { movieId } = useParams()
    const dispatch = useAppDispatch()
    const { movie } = useAppSelector(state => state.movie)
    const [actorsImages, setActorsImages] = useState<Array<{ id: string, image_url: string, actor_id: string, name: string }>>([])
    const router = useRouter()
    const [recommendedMovies, setRecommendedMovies] = useState<Array<MovieData>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showTrailerScreen, setShowTrailerScreen] = useState<boolean>(false)
    const { loading: savedListLoading, savedItem } = useAppSelector(state => state.savedList)
    const toastContext = useContext(ToastProvider)

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

    // Function for fetching actors image
    const handleFetchActorsImages = useCallback(async () => {

        const result = await getActorsImagesApi(movieId as string)
        if (result.success) {
            setActorsImages(result?.data?.actorsImages || [])
        }

    }, [movieId])

    // Function for fetching recommended movies
    const handleFetchRecommendedMovies = useCallback(async () => {

        setLoading(true)

        const result = await getRecommendedMovies(movieId as string)
        if (result.success) {
            setRecommendedMovies(result.movies || [])
        }

        setLoading(false)

    }, [movieId])

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

        if(!savedItem) return

        const authToken = localStorage.getItem("authToken") 
        if(!authToken) return

        dispatch(savedListRequest())
        const result = await deleteSavedItemApi(savedItem?._id, authToken)
        if(result.success){
            dispatch(savedListSuccess({savedItem: null}))
            toastContext?.triggerToastMessage("Movie is removed from saved list", "SUCCESS")
        }else{
            dispatch(savedListFailed({errorMessage: result.error}))
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }


    }

    useEffect(() => {
        (() => {
            if (movieId) {
                handleFetchMovieDetails()
                handleFetchSavedItem()
                handleFetchActorsImages()
                handleFetchRecommendedMovies()
            }
        })()
    }, [
        movieId,
        handleFetchMovieDetails,
        handleFetchActorsImages,
        handleFetchSavedItem,
        handleFetchRecommendedMovies
    ])

    return (

        movie
            ?
            <>
                <div className={`w-full overflow-scroll`}>
                    <div className="absolute top-20 left-5 z-1 cursor-pointer hover:bg-white/20 rounded-full">
                        <BackIcon
                            className="stroke-disable-color"
                            size={25}
                            onClick={() => router.back()}
                        />
                    </div>
                    {/* Movie details */}
                    <div className="w-full px-1 h-150 overflow-hidden relative">
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
                        <div className="max-[600px]:w-full z-2 w-[80%] h-full justify-self-center flex items-center">
                            <div className="max-[700px]:w-[80%] max-[600px]:w-full items-start flex gap-2.5">
                                {/* Movie poster */}
                                <Image
                                    src={movie.poster.image_url}
                                    alt={`${movie.title} poster image`}
                                    width={1000}
                                    height={1000}
                                    className="max-[800px]:hidden h-110 w-auto"
                                    loading="eager"
                                />
                                {/* Movie details */}
                                <div className="max-[500px]:w-full max-[600px]:w-[80%] w-full max-[600px]:pt-3 px-5 flex flex-col h-full text-white/70 gap-2.5">
                                    {/* Movie title */}
                                    <h1 className="text-white text-xl font-bold max-h-15 overflow-hidden wrap-break-word">{movie.title}</h1>
                                    {/* Movie ratings */}
                                    <div className={detailsContainerClassName}>
                                        <RatingsIcon
                                            size={19}
                                            className="shrink-0"
                                        />
                                        <p className={detailsTextClassName}>8.5/10 15.3K Ratings</p>
                                    </div>
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
                                                <Button className={buttonClassName}>
                                                    <RatingsIcon
                                                    />
                                                    <span className={buttonTextClassName}>Rate</span>
                                                </Button>
                                            </div>
                                            :
                                            <div className="w-full flex flex-col gap-2">
                                                <Button
                                                >
                                                    <NotifyIcon
                                                    />
                                                    <span className={buttonTextClassName}>Notify</span>
                                                </Button>
                                                <Button
                                                    className={buttonClassName}
                                                    onClick={() => setShowTrailerScreen(true)}
                                                >
                                                    <PlayIcon
                                                    />
                                                    <span className={buttonTextClassName}>Watch Trailer</span>
                                                </Button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-10">
                        <div className="max-[800px]:w-full px-3 w-[80%] flex flex-col gap-10">
                            {/* Movie synopsis */}
                            <div className="flex flex-col gap-1.25">
                                <h1 className="text-md font-semibold">Synopsis</h1>
                                <p className="text-sm text-foreground-theme-color/60 font-medium">{movie.synopsis}</p>
                            </div>
                            {/* Movie Cast and crews */}
                            {
                                movie.type === "LIVE_ACTION" && actorsImages.length
                                    ?
                                    <div className="flex flex-col gap-1.25">
                                        <h1 className="text-md font-semibold">Cast & Crew</h1>
                                        <div className="flex w-full shrink-0 gap-4 overflow-x-scroll">
                                            {
                                                movie.actors?.map((actor) => (
                                                    <div
                                                        key={actor.id}
                                                        className="flex shrink-0 flex-col w-30 gap-1.25"
                                                    >
                                                        <Image
                                                            src={actorsImages.find((image) => image.actor_id === actor.id)?.image_url || ""}
                                                            width={100}
                                                            height={100}
                                                            alt={`${movie.title} actor image`}
                                                            className="w-30 shrink-0 rounded-sm"
                                                        />
                                                        <span className="text-xs font-medium max-h-5 overflow-hidden">
                                                            {
                                                                actor.name
                                                            }
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {/* Movie ratings and reviews */}
                            <div className="flex flex-col gap-1.25">
                                <h1 className="text-md font-semibold">Reviews & Ratings</h1>
                            </div>
                            {/* Recommended movies */}
                            {
                                recommendedMovies.length || loading
                                    ?
                                    <div className="flex flex-col gap-1.25">
                                        <h1 className="text-md font-semibold">You Might Also Like</h1>
                                        {/* list */}
                                        <div className="flex gap-1.25 overflow-x-scroll">
                                            {
                                                recommendedMovies.map((movie) => (
                                                    <MovieCard
                                                        key={movie?._id}
                                                        id={movie?._id}
                                                        categories={movie?.categories}
                                                        language={movie?.language}
                                                        title={movie?.title}
                                                        poster={movie?.poster?.image_url}
                                                        certificate={movie?.certificate}
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
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
                {
                    showTrailerScreen
                        ?
                        <div className="w-full px-3 flex justify-center h-full z-5 absolute">
                            {/* Background */}
                            <div className="w-full h-full absolute bg-foreground-color opacity-[0.6]"></div>
                            {/* Movie trailer screen */}
                            <div className="max-[800px]:w-full max-[500px]:top-30 w-170 border border-foreground-theme-color/15 flex flex-col gap-3 h-min relative rounded-md top-25 p-5 pt-3 bg-foreground-color">
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
            <div className="px-3">
                <NoResult
                />
            </div>
    )

}

export default MovieDetails