import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"

interface ShowTimeDetailsProps{
    selectedDay: number
    setSelectedDay: Dispatch<SetStateAction<number>>
}

const ShowTimeDetails = ({selectedDay, setSelectedDay}: ShowTimeDetailsProps) => {

    const date = useMemo(() => new Date(), [])
    const totalDaysInCurrentMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
    ).getDate();

    useEffect(() => {
        setSelectedDay(date.getDate())
    }, [date, setSelectedDay])

    return (
        <div className="flex gap-3.75 w-full overflow-x-scroll">
            <div className="w-max h-20 bg-foreground-color text-disable-color text-[1rem] font-medium border border-foreground-theme-color/15 rounded-[5px] flex items-center justify-center">
                <p className="-rotate-90">{date.toLocaleString("en-US", { month: "short" })}</p>
            </div>
            <div className="flex gap-2.5">
                {Array(5)
                    .fill("")
                    .map((_, index) =>
                        date.getDate() + index <= totalDaysInCurrentMonth ? (
                            <div
                                className={`
                                    ${selectedDay === date.getDate() + index? "bg-primary-color text-dark-foreground-color border-primary-color": ""} w-15 px-5 flex justify-center items-center flex-col bg-foreground-color border border-foreground-theme-color/15 cursor-pointer rounded-[5px] shrink-0`}
                                onClick={() => setSelectedDay(date.getDate() + index)}
                                key={index}
                            >
                                <p className="text-[1rem]">{date.getDate() + index}</p>
                                <p className="text-[0.8rem]">
                                    {new Date(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        date.getDate() + index,
                                    ).toLocaleString("en-US", { weekday: "short" })}
                                </p>
                            </div>
                        ) : null,
                    )}
            </div>
        </div>

    )

}

export default ShowTimeDetails