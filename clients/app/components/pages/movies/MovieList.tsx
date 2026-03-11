'use client'

import { getMoviesApi } from "@/api/movie"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearState, incrementPage, movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { Activity, ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react"
import MovieCard from "./MovieCard"
import useObserver from "@/components/hooks/useObserver"
import { FilterProvider } from "@/components/context/providers/FilterContext"
import SearchBar from "@/components/ui/SearchBar"
import MovieFilter from "./MovieFilter"
import { debounce } from "@/utils/debounce"

interface MovieListProps{
    movieStatus?: "SHOWING" | "PENDING" | "NOT_SHOWING"
}

const MovieList = ({movieStatus}: MovieListProps) => {

    const { movies, loading, pagination } = useAppSelector(state => state.movie)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [hasMore, setHasMore] = useState<boolean>(true)
    const filterContext = useContext(FilterProvider)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const categories = useMemo(() => {
        return filterContext?.categories || []
    }, [filterContext?.categories])
    const formats = useMemo(() => {
        return filterContext?.formats || []
    }, [filterContext?.formats])
    const language = filterContext?.language || ""
    const dispatch = useAppDispatch()
    const [isRender, setIsRender] = useState<boolean>(false)

    // Function for fetching movies
    const handleFetchMovies = useCallback(async () => {
        dispatch(movieRequest())
        const result = await getMoviesApi(
            pagination.page, 
            pagination.limit, 
            searchQuery, 
            categories, 
            formats, 
            language,
            movieStatus? movieStatus: ""
        )
        if (result.success) {

            if (result.movies.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            dispatch(movieSuccess({ movies: result.movies }))
        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }
    }, [dispatch, pagination.page, pagination.limit, categories, formats, language, searchQuery, movieStatus])

    const handleOnChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }, 500)

    useEffect(() => {
        (() => {
            setIsRender(true)
            if (isRender) {
                handleFetchMovies()
            }
        })()

    }, [handleFetchMovies, pagination.page, isRender])

    useEffect(() => {

        (() => {
            dispatch(clearState())
        })()

        return () => {
            dispatch(clearState())
        }
    }, [dispatch, categories, formats, language, searchQuery])

    useEffect(() => {
        if (!isIntersecting || loading || !hasMore) return;

        dispatch(incrementPage())

    }, [isIntersecting, hasMore, loading, dispatch]);

    return (

        <>
            <div className="w-full flex flex-col sm:flex-row justify-between gap-2.5">
                <div className="w-full sm:w-75">
                    <SearchBar
                        onChange={handleOnChange}
                    />
                </div>
                <MovieFilter
                />
            </div>
            <div className="grid grid-cols-[repeat(4,auto)] max-[900px]:grid-cols-[repeat(3,auto)] place-items-start justify-start gap-2.5 overflow-scroll">
                {
                    movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            title={movie?.title}
                            categories={movie?.categories}
                            certificate={movie?.certificate}
                            language={movie?.language}
                            poster={movie?.poster.image_url}
                            status={movie.status}
                        />
                    ))
                }
                <Activity mode={hasMore && movies.length ? "visible" : "hidden"}>
                    <div ref={ref}></div>
                </Activity>
            </div>
        </>

    )

}

export default MovieList