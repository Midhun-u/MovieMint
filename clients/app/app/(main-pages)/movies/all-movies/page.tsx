'use client'

import { FilterProvider } from "@/components/context/providers/FilterContext"
import MovieList from "@/components/pages/movies/MovieList"
import NoResult from "@/components/ui/NoResult"
import PageDetails from "@/components/ui/PageDetails"
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
                setCategories: setCategories,
                setFormats: setFormats,
                setLanguage: setLanguage,
                categories: categories,
                formats: formats,
                language: language,
            }}
        >
            <div className="mt-13 w-full flex flex-col gap-2.5">
                {/* Search bar and filter section */}
                <PageDetails
                    title="All Movies"
                    backButton={false}
                    about=""
                />
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