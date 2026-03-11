'use client'

import { FilterProvider } from "@/components/context/providers/FilterContext"
import MovieList from "@/components/pages/movies/MovieList"
import NoResult from "@/components/ui/NoResult"
import { useAppSelector } from "@/store/hooks"
import { Activity, useState } from "react"

const AllMoviesPage = () => {

    const [categories, setCategories] = useState<Array<string>>([])
    const [formats, setFormats] = useState<Array<string>>([])
    const [language, setLanguage] = useState<string>("")
    const { movies } = useAppSelector(state => state.movie)

    return (
        <FilterProvider
            value={{
                categories: categories,
                setCategories: setCategories,
                formats: formats,
                setFormats: setFormats,
                language: language,
                setLanguage: setLanguage
            }}
        >
            <div className="mt-13 w-full flex flex-col gap-2.5">
                {/* Search bar and filter section */}
                <h1 className="font-semibold text-md">All Movies</h1>
                {/* List */}
                <div className="flex flex-col gap-5">
                    <MovieList
                    />
                </div>
            </div>
            <Activity mode={movies.length ? "hidden" : "visible"}>
                <NoResult
                />
            </Activity>
        </FilterProvider>
    )

}

export default AllMoviesPage