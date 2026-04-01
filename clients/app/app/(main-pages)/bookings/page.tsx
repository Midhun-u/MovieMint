import Authentication from "@/components/features/Authentication"
import BookingsList from "@/components/pages/bookings/BookingsList"
import PageDetails from "@/components/ui/PageDetails"

const BookingsPage = () => {

    return (
        <Authentication redirectToAuthPage>
            <div className="w-full flex justify-center">
                <div className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-7.5">
                    <PageDetails
                        title="Bookings"
                        about="Manage and view all your movie reservations."
                        backButton={false}
                    />
                    <BookingsList
                    />
                </div>
            </div>
        </Authentication>
    )

}

export default BookingsPage