import Authentication from "@/components/features/Authentication"
import RatingsSection from "@/components/pages/ratings/RatingsSection"

const RatingsPage = () => {

    return (
        <Authentication redirectToAuthPage>
            <div className="flex justify-center">
               <RatingsSection
               />
            </div>
        </Authentication>
    )

}

export default RatingsPage