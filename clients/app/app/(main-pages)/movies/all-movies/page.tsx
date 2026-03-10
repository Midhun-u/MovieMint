'use client'

import { FilterProvider } from "@/components/context/providers/FilterContext"
import MovieFilter from "@/components/pages/movies/MovieFilter"
import MovieList from "@/components/pages/movies/MovieList"
import SearchBar from "@/components/ui/SearchBar"
import { useState } from "react"

const AllMoviesPage = () => {

    const [categories, setCategories] = useState<Array<string>>([])
    const [formats, setFormats] = useState<Array<string>>([])
    const [language, setLanguage] = useState<string>("")

    return (
        <div className="mt-10 w-full flex flex-col gap-5">
            {/* Search bar and filter section */}
            <div className="w-full flex flex-col sm:flex-row justify-between gap-2.5">
                <div className="w-full sm:w-75">
                    <SearchBar
                    />
                </div>
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
                    <MovieFilter
                    />
                </FilterProvider>
            </div>
            {/* List */}
            <MovieList
            />
        </div>
    )

}

export default AllMoviesPage