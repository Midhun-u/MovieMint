import Authentication from "@/components/features/Authentication"
import TheaterRegistrationForm from "@/components/form/TheaterRegistrationForm"

const TheaterRegistrationPage = () => {

    return (
        <Authentication
            redirectToAuthPage
        >
            <section className="pt-15">
                <TheaterRegistrationForm
                />
            </section>
        </Authentication>
    )

}

export default TheaterRegistrationPage