'use client'

import { getMovieApi, getRecommendedMovies } from "@/api/movie"
import NoResult from "@/components/ui/NoResult"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearState, movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import {
    X as CloseIcon
} from 'lucide-react'
import { getActorsImagesApi } from "@/api/media"
import { MovieData } from "@/types/movie"
import MovieCard from "./MovieCard"
import MovieSkeleton from "./MovieSkeleton"
import MovieDetailsBanner from "./MovieDetailsBanner"

const MovieDetails = () => {

    const { movieId } = useParams()
    const dispatch = useAppDispatch()
    const { movie } = useAppSelector(state => state.movie)
    const [actorsImages, setActorsImages] = useState<Array<{ id: string, image_url: string, actor_id: string, name: string }>>([])
    const [recommendedMovies, setRecommendedMovies] = useState<Array<MovieData>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showTrailerScreen, setShowTrailerScreen] = useState<boolean>(false)

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

    useEffect(() => {
        (() => {
            if (movieId) {
                handleFetchMovieDetails()
                handleFetchActorsImages()
                handleFetchRecommendedMovies()
            }
        })()

        return () => {
            dispatch(clearState())
        }
    }, [
        movieId,
        handleFetchMovieDetails,
        handleFetchActorsImages,
        handleFetchRecommendedMovies,
        dispatch
    ])

    return (

        movie
            ?
            <>
                <div className={`w-full overflow-scroll`}>
                    <MovieDetailsBanner
                        movieId={movieId as string}
                        showRateButton
                    />
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