import { assets } from "@/public/assets/assets"
import Image from "next/image"
import { useState } from "react"

interface TheaterSeatLayoutProps {
    preview: boolean
    layoutNumber: number
    setsNumber: number
    rowNumber: number
    seatNumber: number
}

const TheaterSeatLayout = ({ preview, layoutNumber = 0, setsNumber = 0, rowNumber = 0, seatNumber = 0 }: TheaterSeatLayoutProps) => {

    const [selectedSeat, setSelectedSeat] = useState<Array<{
        layoutNumber: number,
        setNumber: number,
        rowNumber: number,
        seatNumber: number
    }>>([])

    // Function for highlighting selected seat
    const isSeatSelected = ({
        layoutIndex,
        seatIndex,
        rowIndex,
        setIndex
    }: { layoutIndex: number, setIndex: number, rowIndex: number, seatIndex: number }) => {

        const isSelected = selectedSeat.some((selectedSeatDetails) => {
            if (
                selectedSeatDetails.layoutNumber === (layoutIndex + 1 )&&
                selectedSeatDetails.setNumber === (setIndex + 1) &&
                selectedSeatDetails.rowNumber === (rowIndex + 1 )&&
                selectedSeatDetails.seatNumber === (seatIndex + 1)
            )
                return true
        })
        
        if(isSelected) return true
        else return false

    }

    return (

        <div className="w-full">
            {/* Theater Screen */}
            <div className="w-full flex shrink-0 justify-center overflow-auto">
                <Image
                    src={assets.theaterScreen}
                    width={300}
                    height={300}
                    alt="Theater screen"
                    className="rotate-180 w-auto h-auto"
                />
            </div>
            {/* Seat section */}
            <div className="w-full mt-7 flex lg:justify-center gap-10 overflow-auto">
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
                                                            Array(seatNumber).fill(null).map((_, seatIndex) => (

                                                                <div
                                                                    key={seatIndex}
                                                                    className={`${!preview && isSeatSelected({layoutIndex: layoutIndex, seatIndex: seatIndex, rowIndex: rowIndex, setIndex: setIndex})? "bg-primary-color border-none text-dark-foreground-color": ""} w-8 h-8 bg-foreground-color border-2 border-foreground-theme-color/30 rounded-sm cursor-pointer flex justify-center items-center text-xs font-medium transition-all duration-200`}
                                                                    onClick={() =>
                                                                        setSelectedSeat((pre) => [...pre, {
                                                                            layoutNumber: layoutIndex + 1,
                                                                            setNumber: setIndex + 1,
                                                                            rowNumber: rowIndex + 1,
                                                                            seatNumber: seatIndex + 1
                                                                        }])
                                                                    }
                                                                >
                                                                    {`S${seatIndex + 1}`}
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