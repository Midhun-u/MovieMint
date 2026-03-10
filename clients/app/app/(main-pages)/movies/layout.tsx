import TabBar from "@/components/layout/TabBar"
import { ReactNode } from "react"

const MovieLayout = (
    {children}
    :
    {children: ReactNode}
) => {

    return (

        <div className="w-full flex overflow-hidden flex-col items-center mt-22">
            {/* Tab bar section */}
            <div className="w-full sm:w-auto">
                <TabBar />
            </div>
            {children}
        </div>
    )

}

export default MovieLayout