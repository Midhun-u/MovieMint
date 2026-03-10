'use client'

import { getMoviesApi } from "@/api/movie"
import SearchBar from "@/components/ui/SearchBar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { movieFailed, movieRequest, movieSuccess, clearState } from "@/store/movieSlice"
import { debounce } from "@/utils/debounce"
import Image from "next/image"
import { Activity, ChangeEvent, useCallback, useEffect, useState } from "react"

const SearchMoviesList = () => {

    const [searchQuery, setSearchQuery] = useState<string>("")
    const dispatch = useAppDispatch()
    const { movies } = useAppSelector(state => state.movie)

    // Function for fetching movies which is based on search query
    const handleFetchMovies = useCallback(async () => {

        dispatch(movieRequest())

        const result = await getMoviesApi(1, 5, searchQuery)
        if (result.success) {
            dispatch(movieSuccess({ movies: result.movies }))
        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }

    }, [searchQuery, dispatch])

    const handleOnChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }, 500)

    useEffect(() => {
        if (searchQuery) {
            handleFetchMovies()
        } else {
            dispatch(clearState())
        }

        return () => {
            dispatch(clearState())
        }
    }, [handleFetchMovies, searchQuery, dispatch])

    return (
        <div className="min-[500px]:w-100 w-full relative">
            <SearchBar
                onChange={handleOnChange}
            />
            <Activity mode={movies.length ? "visible" : "hidden"}>
                <div className="w-full z-10 absolute border border-foreground-theme-color/15 top-10 flex flex-col gap-2.5 left-0 bg-foreground-color p-5 rounded-md">
                    {
                        movies.map((movie) => (
                            <div className="flex cursor-pointer gap-2.5" key={movie._id}>
                                <Image
                                    src={movie.poster.image_url}
                                    alt={`${movie.title} poster`}
                                    width={50}
                                    height={100}
                                    className="w-12 aspect-2/3"
                                />
                                <div className="flex flex-col ">
                                    <h1 className="text-sm max-h-10 overflow-hidden font-semibold">{movie.title}</h1>
                                    <p className="text-xs font-medium text-foreground-theme-color/45 max-h-4.2 flex items-center">{movie.certificate + " | " + movie.language}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Activity>
        </div>
    )

}

export default SearchMoviesList