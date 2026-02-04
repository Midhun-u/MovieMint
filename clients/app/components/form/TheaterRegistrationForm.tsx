'use client'

import { useId, useState } from "react"
import ScreenProgress from "../ui/ScreenProgress"
import {
    CameraIcon,
    TheaterIcon,
    MapPin as LocationIcon,
    LayoutPanelTop as TheaterLayoutIcon,
    TableCellsMerge as TheaterSetsIcon,
    Grid2X2 as RowsIcon,
    Sofa as SeatIcon
} from "lucide-react"
import FormInput from "./FormInput"
import Label from "./Label"
import CheckBoxList from "../ui/CheckBoxList"
import { theaterFormats } from "@/utils/theaterFormats"

const TheaterRegistrationForm = () => {

    const [screenProgressState, setScreenProgressState] = useState<{ currentScreen: number, totalScreen: number }>({
        currentScreen: 1,
        totalScreen: 2
    })
    const theaterNameId = useId()
    const theaterLocationId = useId()
    const theaterLayoutId = useId()
    const theaterTotalSetsId = useId()
    const theaterTotalRowsId = useId()
    const theaterTotalSeatsId = useId()
    const [formats, setFormats] = useState<Array<string>>([])

    console.log(formats)

    return (

        <div className="w-full mb-20">
            <ScreenProgress
                totalScreen={screenProgressState.totalScreen}
                currentScreen={screenProgressState.currentScreen}
            />
            <form className="w-full mt-10 flex flex-col items-start">
                {/* Heading section */}
                <div className="flex flex-col">
                    <h1
                        className="text-md font-medium "
                    >
                        Theater Registration
                    </h1>
                    <p
                        className="text-sm text-foreground-theme-color/50 md:w-[70%]"
                    >
                        You can register your theater company easily through our online portal by completing the required form details.
                    </p>
                </div>
                {/* Image section */}
                <div className="flex flex-col-reverse gap-2 sm:gap-5 my-10 items-start sm:flex-row sm:items-center">
                    <div className="w-25 h-25 bg-foreground-color border border-foreground-theme-color/20 rounded-lg flex justify-center items-center cursor-pointer">
                        <CameraIcon
                            size={23}
                            strokeWidth={1.5}
                        />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium">Theater Logo</h2>
                        <p className="text-xs text-foreground-theme-color/50">PNG, JPG, JPEG, WEBP. Max size 10MB</p>
                    </div>
                </div>
                {/* Input section */}
                <div className="flex flex-col gap-4 items-start w-full sm:w-[80%] md:w-[50%]">
                    {/* Theater name */}
                    <div className="w-full">
                        <Label
                            labelTitle="Theater Name"
                            labelId={theaterNameId}
                        />
                        <FormInput
                            type="text"
                            Icon={TheaterIcon}
                            placeholder="Enter theater name"
                            id={theaterNameId}
                        />
                    </div>
                    {/* Theater Location */}
                    <div className="w-full">
                        <Label
                            labelTitle="Theater Location"
                            labelId={theaterLocationId}
                        />
                        <FormInput
                            type="text"
                            Icon={LocationIcon}
                            placeholder="Enter theater location"
                            id={theaterLocationId}
                        />
                    </div>
                    {/* Total Layout */}
                    <div className="w-full">
                        <Label
                            labelTitle="Total Layout"
                            labelId={theaterLayoutId}
                        />
                        <FormInput
                            type="number"
                            Icon={TheaterLayoutIcon}
                            placeholder="Enter total seat layout (eg: 1). Max 3"
                            id={theaterLayoutId}
                        />
                    </div>
                    {/* Total Sets */}
                    <div className="w-full">
                        <Label
                            labelTitle="Total Sets"
                            labelId={theaterTotalSetsId}
                        />
                        <FormInput
                            type="number"
                            Icon={TheaterSetsIcon}
                            placeholder="Enter total sets in a layout (eg: 2). Max 4"
                            id={theaterTotalSetsId}
                        />
                    </div>
                    {/* Total Rows */}
                    <div className="w-full">
                        <Label
                            labelTitle="Total Rows"
                            labelId={theaterTotalRowsId}
                        />
                        <FormInput
                            Icon={RowsIcon}
                            type="number"
                            placeholder="Enter total rows in a sets (eg: 4). Max 5"
                            id={theaterTotalRowsId}
                        />
                    </div>
                    {/* Total seats */}
                    <div className="w-full">
                        <Label
                            labelTitle="Total Seats"
                            labelId={theaterTotalSeatsId}
                        />
                        <FormInput
                            Icon={SeatIcon}
                            id={theaterTotalSeatsId}
                            type="number"
                            placeholder="Enter total seats in a row (eg: 5). Max 7"
                        />
                    </div>
                    {/* Formats */}
                    <div className="w-full">
                        <Label
                            labelTitle="Formats"
                        />
                        <div>
                            <CheckBoxList
                                values={theaterFormats}
                                selectedLimit={null}
                                setValues={setFormats}
                                checkedValues={formats}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )

}

export default TheaterRegistrationForm