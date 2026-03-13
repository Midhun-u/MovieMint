'use client'

import { getMovieApi } from "@/api/movie"
import NoResult from "@/components/ui/NoResult"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
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
} from 'lucide-react'
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"
import { Button } from "@/components/ui/button"
import { getActorsImagesApi } from "@/api/media"

const detailsContainerClassName = "flex items-center gap-1.5"
const detailsTextClassName = "font-medium max-h-12 text-sm"
const buttonClassName = "bg-foreground-color text-foreground-theme-color hover:bg-background-color"
const buttonTextClassName = "text-xs font-medium"

const MovieDetails = () => {

    const { movieId } = useParams()
    const dispatch = useAppDispatch()
    const { movie } = useAppSelector(state => state.movie)
    const [actorsImages, setActorsImages] = useState<Array<{ id: string, image_url: string, actor_id: string, name: string }>>([])
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

    // Function for fetching actors image
    const handleFetchActorsImages = useCallback(async () => {

        const result = await getActorsImagesApi(movieId as string)
        if (result.success) {
            setActorsImages(result?.data?.actorsImages || [])
        }

    }, [movieId])

    useEffect(() => {
        (() => {
            if (movieId) {
                handleFetchMovieDetails()
                handleFetchActorsImages()
            }
        })()
    }, [movieId, handleFetchMovieDetails, handleFetchActorsImages])

    return (

        movie
            ?
            <div className="w-full">
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
                                className="max-[800px]:hidden h-100 w-auto"
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
                                <Button className="mt-2.5">
                                    <TicketIcon
                                    />
                                    <span className={buttonTextClassName}>Book Tickets</span>
                                </Button>
                                <Button className={buttonClassName}>
                                    <PlayIcon
                                    />
                                    <span className={buttonTextClassName}>Watch Trailer</span>
                                </Button>
                                <Button className={buttonClassName}>
                                    <SaveIcon
                                    />
                                    <span className={buttonTextClassName}>Save</span>
                                </Button>
                                <Button className={buttonClassName}>
                                    <RatingsIcon
                                    />
                                    <span className={buttonTextClassName}>Rate</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-10">
                    <div className="w-[80%] flex flex-col gap-10">
                        {/* Movie synopsis */}
                        <div>
                            <h1 className="text-md font-semibold">Synopsis</h1>
                            <p className="text-sm text-foreground-theme-color/60">{movie.synopsis}</p>
                        </div>
                        {/* Movie Cast and crews */}
                        {
                            movie.type === "LIVE_ACTION" && actorsImages.length
                                ?
                                <div className="flex flex-col gap-2.5">
                                    <h1 className="text-md font-semibold">Cast & Crew</h1>
                                    <div className="flex gap-3">
                                        {
                                            actorsImages.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="flex flex-col"
                                                >
                                                    <Image
                                                        src={image.image_url}
                                                        width={100}
                                                        height={100}
                                                        alt={`${movie.title} actor image`}
                                                        className="w-25 rounded-sm"
                                                    />
                                                    <span>
                                                        
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
            :
            <NoResult
            />
    )

}

export default MovieDetails