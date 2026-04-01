import MovieTabBar from "@/components/layout/MovieTabBar"
import { ReactNode } from "react"

const MovieLayout = (
    { children }
        :
        { children: ReactNode }
) => {

    return (

        <section className="w-full flex overflow-hidden flex-col items-center mt-13">
            {/* Tab bar section */}
            <section className="w-full absolute mt-8 z-6 sm:w-auto px-3">
                <MovieTabBar />
            </section>
            <section className="w-full flex flex-col items-center">
                {children}
            </section>
        </section>
    )

}

export default MovieLayout