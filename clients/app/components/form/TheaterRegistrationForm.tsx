'use client'

import React, { Suspense, useContext, useId, useRef, useState } from "react"
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from "../ui/input"
import { ToastProvider } from "../context/ToastMessage"
import Image from "next/image"
import { convertStringToNumber } from "@/utils/convertStringToNumber"
import { deleteTheaterRegistrationApi, registerTheaterApi } from "@/api/theater"
import { uploadTheaterImageApi } from "@/api/media"
import Spinner from "../ui/Spinner"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { theaterFailed, theaterRequest, theaterSuccess } from "@/store/theaterSlice"

type Inputs = {
    theaterName: string
    theaterLocation: string
    totalLayout: number
    totalSets: number
    totalRows: number
    totalSeats: number
}

const TheaterSeatLayout = React.lazy(() => import("../layout/TheaterSeatLayout"))

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
    const { handleSubmit, register, formState: { errors: formErrors } } = useForm<Inputs>()
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [theaterLogo, setTheaterLogo] = useState<{
        file: File | null,
        preview: string
    }>({
        file: null,
        preview: ''
    })
    const [theaterDetails, setTheaterDetails] = useState<Inputs & { file: File, formats: Array<string>, allowCancellation: boolean }>()
    const toastContext = useContext(ToastProvider)
    const { theme } = useAppSelector(state => state.theme)
    const { loading } = useAppSelector(state => state.theater)
    const dispatch = useAppDispatch()

    // Function for storing theater logo
    const handleStoreLogo = (files: FileList | null) => {

        if (!files?.length) return

        const file = files[0]
        const fileSize = 10 * 1024 * 1024 // 10MB

        if (!file.type.includes("image")) return toastContext?.triggerToastMessage("Invalid file", "ERROR")

        if (file.size > fileSize) return toastContext?.triggerToastMessage("File size is exceeded the limit", "ERROR")
        // Reading file as base64 for showing preview
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = async () => {
            await setTheaterLogo({ file: file, preview: fileReader.result as string })
        }

    }

    // Function for submitting form
    const submitForm: SubmitHandler<Inputs> = (data) => {

        if (
            !data.theaterName.trim() ||
            !data.theaterLocation.trim()
        ) {
            toastContext?.triggerToastMessage("Invalid fields", "ERROR")
            return
        }

        if (formats.length < 2) {
            return toastContext?.triggerToastMessage("Add atleast two supported formats", "ERROR")
        }

        if (!theaterLogo.file) {
            return toastContext?.triggerToastMessage("Upload theater logo", "ERROR")
        }

        setTheaterDetails({
            file: theaterLogo.file,
            theaterName: data.theaterName,
            theaterLocation: data.theaterLocation,
            totalLayout: convertStringToNumber(data.totalLayout),
            totalSets: convertStringToNumber(data.totalSets),
            totalRows: convertStringToNumber(data.totalRows),
            totalSeats: convertStringToNumber(data.totalSeats),
            allowCancellation: allowCancellation,
            formats: formats
        })

        setCurrentScreen("PREVIEW")
        setScreenProgressState({ ...screenProgressState, currentScreen: 2 })

        window.scrollTo({
            behavior: "smooth",
            top: 0
        })

    }

    // Function for registering theater
    const handleRegisterTheater = async () => {

        if (!theaterDetails) return

        const authToken = localStorage.getItem("authToken") || ""

        dispatch(theaterRequest())
        const theaterResult = await registerTheaterApi({
            theaterName: theaterDetails.theaterName,
            theaterLocation: theaterDetails.theaterLocation,
            formats: theaterDetails.formats,
            layoutNumber: theaterDetails.totalLayout,
            setsNumber: theaterDetails.totalSets,
            rowsNumber: theaterDetails.totalRows,
            seatsNumber: theaterDetails.totalSeats,
            allowCancellation: theaterDetails.allowCancellation
        }, authToken)

        if (theaterResult.success && theaterResult.theater) {

            const imageResult = await uploadTheaterImageApi(theaterResult.theater.id, theaterDetails.file, authToken)

            if (imageResult.success) {

                toastContext?.triggerToastMessage("Theater is registered", "SUCCESS")
                dispatch(theaterSuccess({ theater: theaterResult.theater }))

            } else {
                // Deleting theater registration because of the failure in uploading theater image
                await deleteTheaterRegistrationApi(theaterResult.theater.id, authToken)

                toastContext?.triggerToastMessage("Theater couldn't registered", "ERROR")
                dispatch(theaterFailed({ errorMessage: imageResult.error }))
            }

        } else {
            toastContext?.triggerToastMessage(theaterResult.error, "ERROR")
            dispatch(theaterFailed({ errorMessage: theaterResult.error }))
        }

    }

    return (

        <div className="w-full mb-20">
            <ScreenProgress
                totalScreen={screenProgressState.totalScreen}
                currentScreen={screenProgressState.currentScreen}
            />
            <form onSubmit={handleSubmit(submitForm)} className="w-full mt-10 flex flex-col items-start">
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
                                <div
                                    onClick={() => imageRef.current?.click()}
                                    className={`${theaterLogo.file && theaterLogo.preview ? "border-none bg-background-color" : ""} w-25 h-25 bg-foreground-color border border-foreground-theme-color/20 rounded-lg flex justify-center items-center cursor-pointer`}
                                >
                                    {
                                        theaterLogo.file && theaterLogo.preview
                                            ?
                                            <Image
                                                src={theaterLogo.preview}
                                                width={50}
                                                height={50}
                                                alt="Theater logo"
                                                className="w-full h-auto rounded-lg aspect-square"
                                            />
                                            :
                                            <>
                                                <CameraIcon
                                                    size={23}
                                                    strokeWidth={1.5}
                                                    className="stroke-disable-color"
                                                />
                                                <Input
                                                    type="file"
                                                    hidden
                                                    ref={imageRef}
                                                    onChange={(event) => handleStoreLogo(event.target.files)}
                                                />
                                            </>
                                    }
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
                                        {...register("theaterName", {
                                            minLength: 3,
                                            maxLength: 25,
                                            required: true
                                        })}
                                        aria-invalid={formErrors.theaterName ? "true" : "false"}
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
                                        {...register("theaterLocation", {
                                            minLength: 10,
                                            maxLength: 100,
                                            required: true
                                        })}
                                        aria-invalid={formErrors.theaterLocation ? "true" : "false"}
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
                                        {...register("totalLayout", {
                                            minLength: 1,
                                            maxLength: 3,
                                            required: true
                                        })}
                                        aria-invalid={formErrors.totalLayout ? "true" : "false"}
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
                                        {...register("totalSets", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 4
                                        })}
                                        aria-invalid={formErrors.totalSets ? "true" : "false"}
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
                                        {...register("totalRows", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 5
                                        })}
                                        aria-invalid={formErrors.totalRows ? "true" : "false"}
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
                                        {...register("totalSeats", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 7
                                        })}
                                        aria-invalid={formErrors.totalSeats ? "true" : "false"}
                                    />
                                </div>
                                {/* Formats */}
                                <div className="w-full">
                                    <Label
                                        labelTitle="Formats"
                                    />
                                    <div className="px-px">
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
                                    <div className="px-px">
                                        <CustomCheckBox
                                            onMarkChecked={() => {
                                                if (!allowCancellation) setAllowCancellation(true)
                                            }}
                                            onUnmarkChecked={() => {
                                                if (allowCancellation) setAllowCancellation(false)
                                            }}
                                            value="Allow"
                                            defaultChecked={allowCancellation}
                                        />
                                    </div>
                                </div>
                                {/* Proceed button */}
                                <div className="mt-3 w-full">
                                    <Button
                                        className="w-full "
                                        type="submit"
                                    >
                                        <span>Proceed</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                        :
                        <div className="mt-13 w-full">
                            {/* Preview section */}
                            {
                                theaterDetails
                                    ?
                                    <Suspense fallback={<Spinner size={25} color={theme === "dark" ? "white" : "black"} />}>
                                        <TheaterSeatLayout
                                            preview={true}
                                            layoutNumber={theaterDetails.totalLayout as number}
                                            setsNumber={theaterDetails.totalSets as number}
                                            rowNumber={theaterDetails.totalRows as number}
                                            seatNumber={theaterDetails.totalSeats as number}
                                        />
                                    </Suspense>
                                    :
                                    null
                            }
                            {/* Button section */}
                            <div className="mt-15 w-full flex flex-col items-center gap-3">
                                <Button
                                    className="w-full sm:w-[60%] md:w-[60%] lg:w-[40%]"
                                    onClick={() => handleRegisterTheater()}
                                    type="button"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ?
                                            <Spinner
                                                size={20}
                                                color="black"
                                            />
                                            :
                                            <span>Register</span>
                                    }
                                </Button>
                                <Button
                                    className="w-full sm:w-[60%] md:w-[60%] lg:w-[40%] bg-foreground-color border border-foreground-theme-color/20 text-foreground-theme-color hover:bg-background-color"
                                    onClick={() => {
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