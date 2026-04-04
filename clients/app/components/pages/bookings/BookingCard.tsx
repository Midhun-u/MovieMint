import Image from "next/image"
import {
    TheaterIcon,
    MapPinIcon as LocationIcon,
    Calendar as DateIcon,
    TicketIcon,
    Armchair as SeatIcon,
    UserIcon
} from 'lucide-react'
import { Seat } from "@/types/seat"

interface BookingCardProps {
    id: string
    moviePoster: string
    movieTitle: string
    theaterName: string
    theaterLocation: string
    showTime: string
    totalTickets: number
    bookedSeats: Array<Seat>
    status: "COMPLETED" | "CANCELLED"
    onClickOnCard: () => void
}

const detailsContainerClass = "flex gap-[7px] items-center overflow-hidden"
const iconDetails = {
    size: 19,
    strokeWidth: 1.7,
    className: "stroke-foreground-theme-color/50 shrink-0"
}
const detailsClass = "text-[0.8rem] text-foreground-theme-color/50 font-medium max-h-9.75 overflow-hidden break-all"

const BookingCard = ({
    id,
    moviePoster,
    movieTitle,
    theaterName,
    theaterLocation,
    showTime,
    totalTickets,
    bookedSeats,
    status,
    onClickOnCard
}: BookingCardProps) => {

    return (

        <div onClick={() => onClickOnCard()} className="max-[550px]:flex-col cursor-pointer p-5 relative pb-8 bg-foreground-color border border-foreground-theme-color/15 rounded-[10px] flex gap-3 h-full">
            {
                moviePoster
                    ?
                    <Image
                        src={moviePoster}
                        alt={`${movieTitle} poster image`}
                        width={500}
                        height={1000}
                        className="max-[550px]:w-50 max-[550px]:h-auto aspect-2/3 h-37.5 w-auto"
                    />
                    :
                    null
            }
            <div className="w-full flex flex-col gap-2.5">
                <div className="flex flex-col gap-2.5">
                    <h1 className="max-h-9.75 overflow-hidden text-[0.9rem] font-bold">
                        {movieTitle}
                    </h1>
                    <div className="flex flex-col gap-1.25">
                        <div className={detailsContainerClass}>
                            <TheaterIcon
                                {...iconDetails}
                            />
                            <p className={detailsClass}>
                                {theaterName}
                            </p>
                        </div>
                        <div className={detailsContainerClass}>
                            <LocationIcon
                                {...iconDetails}
                            />
                            <p className={detailsClass}>{theaterLocation}</p>
                        </div>
                        <div className={detailsContainerClass}>
                            <DateIcon
                                {...iconDetails}
                            />
                            <p className={detailsClass}>{showTime}</p>
                        </div>
                        <div className={detailsContainerClass}>
                            <TicketIcon
                                {...iconDetails}
                            />
                            <p className={detailsClass}>{totalTickets} Tickets</p>
                        </div>
                        <div className={detailsContainerClass}>
                            <SeatIcon
                                {...iconDetails}
                            />
                            <div className="flex flex-wrap gap-1.25 max-h-9.75 break-all">
                                {
                                    bookedSeats.map((seat, index) => (
                                        <p className={detailsClass} key={index}>
                                            L{seat.layoutNumber}S{seat.setNumber}R{seat.rowNumber}S{seat.seatNumber}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full bg-foreground-theme-color/15" />
                <div className={detailsContainerClass}>
                    <UserIcon
                        {...iconDetails}
                    />
                    <p className={detailsClass}>Ref: {id}</p>
                </div>
            </div>
            <p className={`absolute bottom-2 right-2.5 py-0.5 font-medium px-2 text-[0.7rem] ${status === "COMPLETED" ? "bg-success-background-color text-success-foreground-color" : "bg-error-background-color text-error-foreground-color"} rounded-[5px]`}>
                {
                    status === "COMPLETED"
                        ?
                        <>
                            Completed
                        </>
                        :
                        <>
                            Cancelled
                        </>
                }
            </p>
        </div>

    )

}

export default BookingCard