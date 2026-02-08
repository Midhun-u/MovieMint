import { TheaterDetails } from "@/types/theater"
import TheaterDetailsCard from "./TheatereDetailsCard"

interface TheaterRegistrationDetailsProps{
    theaterDetails: TheaterDetails
}

const TheaterRegistrationDetails = ({theaterDetails}: TheaterRegistrationDetailsProps) => {

    return (

        <div className="w-full">
            {/* Title section */}
            <div className="w-full flex flex-col -gap-1">
                <h1 className="text-md font-medium ">Registered Theater</h1>
                <p className="text-sm text-foreground-theme-color/50">This allows to see the theater which you registered </p>
            </div>
            {/* Theater Details */}
            <div className="mt-7 w-full flex">
                <TheaterDetailsCard
                    theaterDetails={theaterDetails}
                />
            </div>
        </div>

    )

}

export default TheaterRegistrationDetails