'use client'

import TabBar from "@/components/layout/TabBar"
import { useState } from "react"

const BookingsList = () => {

    const [tabBarValue, setTabBarValue] = useState<string>("")

    return (
        <div className="flex flex-col gap-2.5">
            <div className="max-[500px]:max-w-full max-w-100 w-min">
                <TabBar
                    navs={[
                        {
                            title: "All",
                            value: ""
                        },
                        {
                            title: "Completed",
                            value: "COMPLETED"
                        },
                        {
                            title: "Cancelled",
                            value: "CANCELLED"
                        }
                    ]}
                    selectedValue={tabBarValue}
                    setValue={setTabBarValue}
                />
            </div>
        </div>
    )

}

export default BookingsList