import { assets } from "@/public/assets/assets"
import { Seat } from "@/types/seat"
import { SelectedSeat } from "@/types/selectedSeat"
import Image from "next/image"
import { Dispatch, SetStateAction, useCallback, useMemo } from "react"
import {
    X as OccupiedIcon
} from 'lucide-react'

interface TheaterSeatLayoutProps {
    preview: boolean
    layoutNumber: number
    setsNumber: number
    rowNumber: number
    seatNumber: number
    setSelectedSeats?: Dispatch<SetStateAction<Array<SelectedSeat>>>
    selectedSeats?: Array<SelectedSeat>
    limit?: number
    selectedSeatsLength?: number
    bookedSeats?: Array<Seat>
}

const TheaterSeatLayout = ({
    preview,
    layoutNumber = 0,
    setsNumber = 0,
    rowNumber = 0,
    seatNumber = 0,
    setSelectedSeats,
    selectedSeats,
    selectedSeatsLength,
    limit,
    bookedSeats
}: TheaterSeatLayoutProps) => {

    const memoSelectedSeats = useMemo(() => selectedSeats, [selectedSeats])
    const memoBookedSeats = useMemo(() => bookedSeats, [bookedSeats])

    // Function for highlighting selected seats and booked seats
    const isSeatSelected = useCallback(({
        layoutIndex,
        seatIndex,
        rowIndex,
        setIndex
    }: { layoutIndex: number, setIndex: number, rowIndex: number, seatIndex: number }, type: "selected" | "booked") => {

        if (memoSelectedSeats && type === "selected") {

            const isSelected = memoSelectedSeats?.some((selectedSeatDetails) => {
                if (
                    selectedSeatDetails &&
                    selectedSeatDetails.layoutNumber === (layoutIndex + 1) &&
                    selectedSeatDetails.setNumber === (setIndex + 1) &&
                    selectedSeatDetails.rowNumber === (rowIndex + 1) &&
                    selectedSeatDetails.seatNumber === (seatIndex + 1)
                )
                    return true
            })

            return isSelected
        } else if (memoBookedSeats && type === "booked") {

            const isBooked = memoBookedSeats?.some((bookedSeat) => {
                if (
                    bookedSeat &&
                    bookedSeat.layoutNumber === (layoutIndex + 1) &&
                    bookedSeat.setNumber === (setIndex + 1) &&
                    bookedSeat.rowNumber === (rowIndex + 1) &&
                    bookedSeat.seatNumber === (seatIndex + 1)
                ) return true
            })

            return isBooked

        }

    }, [memoSelectedSeats, memoBookedSeats])

    // Function for selecting seats
    const handleSelectSeats = ({
        layoutIndex,
        rowIndex,
        setIndex,
        seatIndex
    }: {
        layoutIndex: number
        rowIndex: number
        setIndex: number
        seatIndex: number
    }) => {

        if (!setSelectedSeats || !limit || !selectedSeats || selectedSeatsLength === undefined) return

        if (selectedSeats.length <= limit - 1) {
            setSelectedSeats(pre => [...pre, {
                layoutNumber: layoutIndex + 1,
                setNumber: setIndex + 1,
                rowNumber: rowIndex + 1,
                seatNumber: seatIndex + 1
            }])
        } else if (selectedSeats) {
            const slicedSeats = selectedSeats.slice(0, -1)
            setSelectedSeats([...slicedSeats, {
                layoutNumber: layoutIndex + 1,
                setNumber: setIndex + 1,
                rowNumber: rowIndex + 1,
                seatNumber: seatIndex + 1
            }])
        }


    }

    return (

        <div className="w-full flex flex-col items-center">
            {/* Theater Screen */}
            <div className="w-full justify-center flex shrink-0 overflow-auto">
                <Image
                    src={assets.theaterScreen}
                    width={300}
                    height={300}
                    alt="Theater screen"
                    className="rotate-180 w-auto h-auto"
                />
            </div>
            {/* Seat section */}
            <div className="min-[900px]:max-w-175 w-full mt-7 flex gap-10 overflow-x-scroll">
                {
                    // Layouts
                    Array(layoutNumber).fill(null).map((_, layoutIndex) => (

                        <div
                            key={layoutIndex}
                        >
                            <div className="flex flex-col gap-7">
                                {
                                    // Sets
                                    Array(setsNumber).fill(null).map((_, setIndex) => (

                                        <div
                                            key={setIndex}
                                            className="flex flex-col gap-2"
                                        >
                                            {
                                                // Rows
                                                Array(rowNumber).fill(null).map((_, rowIndex) => (

                                                    <div
                                                        className="flex gap-2"
                                                        key={rowIndex}
                                                    >
                                                        {
                                                            // Seats
                                                            Array(seatNumber).fill(null).map((_, seatIndex) => (

                                                                !isSeatSelected({
                                                                    layoutIndex: layoutIndex,
                                                                    rowIndex: rowIndex,
                                                                    setIndex: setIndex,
                                                                    seatIndex: seatIndex
                                                                }, "booked")
                                                                    ?
                                                                    <div
                                                                        key={seatIndex}
                                                                        className={`${!preview && isSeatSelected({ layoutIndex: layoutIndex, seatIndex: seatIndex, rowIndex: rowIndex, setIndex: setIndex }, "selected") ? "bg-primary-color border-none text-dark-foreground-color" : ""} w-8 h-8 bg-foreground-color border-2 border-foreground-theme-color/30 rounded-sm cursor-pointer flex justify-center items-center text-xs font-medium transition-all duration-200`}
                                                                        onClick={() => handleSelectSeats({
                                                                            layoutIndex: layoutIndex,
                                                                            rowIndex: rowIndex,
                                                                            setIndex: setIndex,
                                                                            seatIndex: seatIndex
                                                                        })}
                                                                    >
                                                                        {`S${seatIndex + 1}`}
                                                                    </div>
                                                                    :
                                                                    <div
                                                                        key={seatIndex}
                                                                        className="w-8 h-8 bg-background-color border-2 border-background-color rounded-sm flex justify-center items-center text-xs font-medium "
                                                                    >
                                                                        <OccupiedIcon
                                                                            size={15}
                                                                            strokeWidth={1.6}
                                                                        />
                                                                    </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )

}

export default TheaterSeatLayout