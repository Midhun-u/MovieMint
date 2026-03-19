'use client'

import { getMoviesApi } from "@/api/movie"
import { MovieData } from "@/types/movie"
import { Activity, useCallback, useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import Link from "next/link"
import MovieSkeleton from "./MovieSkeleton"

interface MovieSliderProps {
    movieCategory: string
}

const MovieSlider = ({ movieCategory }: MovieSliderProps) => {

    const [movies, setMovies] = useState<Array<MovieData>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const limit = 20

    // Function for fetching movies
    const handleFetchMovies = useCallback(async () => {

        const result = await getMoviesApi(1, limit, "", [movieCategory])
        if (result.success) {
            setMovies(result.movies)
        }

        setLoading(false)

    }, [movieCategory])

    useEffect(() => {
        (() => {
            handleFetchMovies()
        })()

        return () => {
            setMovies([])
        }
    }, [handleFetchMovies])

    return (

        <div className="flex flex-col gap-1">
            {/* Title section */}
            <div className="w-full flex items-center justify-between gap-2.5">
                <h1 className="font-semibold">{movieCategory}</h1>
                {
                    movies.length >= 20
                        ?
                        <Link
                            href={`/movies/all-movies/?category=${movieCategory}`}
                            className="text-sm text-primary-accent-color font-medium"
                        >
                            See All
                        </Link>
                        :
                        null
                }
            </div>
            {/* Slider */}
            <div className="flex gap-1 overflow-scroll">
                {
                    movies.map(movie => (
                        <div key={movie._id}>
                            <MovieCard
                                title={movie?.title}
                                categories={movie?.categories}
                                certificate={movie?.certificate}
                                language={movie?.language}
                                poster={movie?.poster.image_url}
                                id={movie._id}
                                status={movie.status === "PENDING"? "PENDING": undefined}
                            />
                        </div>
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

    )
}

export default MovieSlider