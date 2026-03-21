import Authentication from "@/components/features/Authentication"
import NotificationList from "@/components/pages/notifications/NotificationList"
import PageDetails from "@/components/ui/PageDetails"

const NotificationPage = () => {

    return (

        <div className="w-full flex justify-center">
            <div className="mt-26 px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full flex flex-col gap-7.5">
                <PageDetails
                    title="Notifications"
                    about="Stay updated with real-time notifications about your bookings, new movie releases, and special offers so you never miss anything important."
                    backButton={false}
                />
                <Authentication redirectToAuthPage>
                    <NotificationList
                    />
                </Authentication>
            </div>
        </div>

    )

}

export default NotificationPage