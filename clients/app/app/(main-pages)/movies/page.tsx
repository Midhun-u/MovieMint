import Banners from "@/components/pages/movies/Banners"
import MovieSlider from "@/components/pages/movies/MovieSlider"
import SearchMoviesList from "@/components/pages/movies/SearchMoviesList"
import { assets } from "@/public/assets/assets"
import Image from "next/image"
import Link from "next/link"

const MoviesPage = () => {

  return (

    <div className="w-full flex overflow-hidden flex-col items-center mt-2">
      {/* Banners section */}
      <div className="overflow-scroll self-start">
        <Banners
        />
      </div>
      {/* Main content */}
      <div className="mt-5 w-full gap-8 flex flex-col">
        <div className="w-full">
          <SearchMoviesList
          />
        </div>
        <MovieSlider
          movieCategory="Action"
        />
        <MovieSlider
          movieCategory="Adventure"
        />
        <MovieSlider
          movieCategory="Animation"
        />
        <MovieSlider
          movieCategory="Drama"
        />
        <MovieSlider
          movieCategory="Thriller"
        />
      </div>
      {/* Last section */}
      <div className="mt-10 w-full flex flex-col items-center gap-10">
        <Image
          src={assets.homeVector}
          alt="Home vector"
          className="aspect-square w-90 "
        />
        <Link
          className="justify-center rounded-sm px-2 py-1 text-sm min-[400px]:w-60 w-full bg-foreground-color hover:bg-foreground-color/20 border border-foreground-theme-color/15 flex items-center"
          href={"/movies/all-movies"}
        >
          <>View All</>
        </Link>
      </div>
    </div>

  )
}

export default MoviesPage