import MostRatedMovies from "@/components/pages/movies/MostRateMovies"
import PageDetails from "@/components/ui/PageDetails"

const MostRatingsPage = () => {

    return (
        <div
            className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-2.5"
        >
            <PageDetails
                title="Most Rated Movies"
                about=""
                backButton={false}
            />
            <MostRatedMovies
            />
        </div>
    )

}

export default MostRatingsPage