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
    Sofa as SeatIcon,
    ChevronLeft as BackIcon
} from "lucide-react"
import FormInput from "./FormInput"
import Label from "./Label"
import CheckBoxList from "../ui/CheckBoxList"
import { theaterFormats } from "@/utils/theaterFormats"
import CustomCheckBox from "../ui/CustomCheckBox"
import { Button } from "../ui/button"
import TheaterSeatLayout from "../layout/TheaterSeatLayout"

const TheaterRegistrationForm = () => {

    const [screenProgressState, setScreenProgressState] = useState<{ currentScreen: number, totalScreen: number }>({
        currentScreen: 1,
        totalScreen: 2
    })
    const [currentScreen, setCurrentScreen] = useState<"FORM" | "PREVIEW">("FORM")
    const theaterNameId = useId()
    const theaterLocationId = useId()
    const theaterLayoutId = useId()
    const theaterTotalSetsId = useId()
    const theaterTotalRowsId = useId()
    const theaterTotalSeatsId = useId()
    const [formats, setFormats] = useState<Array<string>>([])
    const [allowCancellation, setAllowCancellation] = useState<boolean>(false)

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
                        {
                            currentScreen === "FORM"
                                ?
                                <>
                                    Theater Registration
                                </>
                                :
                                <>
                                    Theater Seat Layout Preview
                                </>
                        }
                    </h1>
                    <p
                        className="text-sm text-foreground-theme-color/50 md:w-[80%]"
                    >
                        {
                            currentScreen === "FORM"
                                ?
                                <>
                                    You can register your theater company easily through our online portal by completing the required form details.
                                </>
                                :
                                <>
                                    You can see the preview of seats based on the details which you filled in the form
                                </>
                        }
                    </p>
                </div>
                {
                    currentScreen === "FORM"
                        ?
                        <>
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
                                {/* Cancellation */}
                                <div className="w-full flex flex-col gap-2 mt-2">
                                    <Label
                                        labelTitle="Allow Cancellation"
                                    />
                                    <CustomCheckBox
                                        onMarkChecked={() => setAllowCancellation(false)}
                                        onUnmarkChecked={() => setAllowCancellation(true)}
                                        value="Allow"
                                    />
                                </div>
                                {/* Proceed button */}
                                <div className="mt-3 w-full">
                                    <Button
                                        className="w-full "
                                        type="button"
                                        onClick={() => {
                                            setCurrentScreen("PREVIEW")
                                            setScreenProgressState({ ...screenProgressState, currentScreen: 2 })
                                            window.scrollTo({
                                                behavior: "smooth",
                                                top: 0
                                            })
                                        }}
                                    >
                                        <span>Proceed</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                        :
                        <div className="mt-13 w-full">
                            {/* Preview section */}
                            <TheaterSeatLayout
                                preview={false}
                                layoutNumber={3}
                                setsNumber={3}
                                rowNumber={3}
                                seatNumber={7}
                            />
                            {/* Button section */}
                            <div className="mt-15 w-full flex flex-col items-center gap-3">
                                <Button
                                    className="w-full sm:w-[60%] md:w-[60%] lg:w-[40%]"
                                >
                                    <span>Register</span>
                                </Button>
                                <Button
                                    className="w-full sm:w-[60%] md:w-[60%] lg:w-[40%] bg-foreground-color border border-foreground-theme-color/20 text-foreground-theme-color hover:bg-background-color"
                                    onClick={() =>{
                                        setCurrentScreen("FORM")
                                        window.scrollTo({
                                            behavior: "smooth",
                                            top: 0
                                        })
                                    }}
                                >
                                    <BackIcon
                                        size={23}
                                    />
                                    <span>Back</span>
                                </Button>
                            </div>
                        </div>
                }

            </form>
        </div>

    )

}

export default TheaterRegistrationForm