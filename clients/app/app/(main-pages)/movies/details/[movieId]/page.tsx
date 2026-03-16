import Authentication from "@/components/features/Authentication"
import MovieDetails from "@/components/pages/movies/MovieDetails"

const DetailsPage = () => {

    return (
        <div className="mt-15 flex justify-center">
            <Authentication redirectToAuthPage>
                <MovieDetails
                />
            </Authentication>
        </div>
    )

}

export default DetailsPage