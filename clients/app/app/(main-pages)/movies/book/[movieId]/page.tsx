import Authentication from "@/components/features/Authentication"
import BookingsSection from "@/components/pages/book/BookingsSection"

const BookMoviePage = () => {

    return (

        <div>
            <Authentication redirectToAuthPage>
                <BookingsSection
                />
            </Authentication>
        </div>

    )

}

export default BookMoviePage