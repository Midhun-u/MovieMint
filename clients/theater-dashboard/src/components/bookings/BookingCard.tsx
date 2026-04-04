import {
    Calendar as DateIcon,
    TicketIcon,
    Armchair as SeatIcon,
    UserIcon
} from 'lucide-react'
import type { Seat } from "../../types/seat"
import style from '../../styles/bookings/bookingsCard.module.scss'

interface BookingCardProps {
    id: string
    moviePoster: string
    movieTitle: string
    showTime: string
    totalTickets: number
    bookedSeats: Array<Seat>
    status: "COMPLETED" | "CANCELLED"
}

const BookingCard = ({
    id,
    moviePoster,
    movieTitle,
    showTime,
    totalTickets,
    bookedSeats,
    status
}: BookingCardProps) => {

    const iconDetails = {
        size: 19,
        strokeWidth: 1.7,
        className: style['icon']
    }

    return (

        <div className={style['container']}>
            {
                moviePoster
                    ?
                    <img
                        src={moviePoster}
                        alt={`${movieTitle} poster image`}
                        className={style['movie-poster']}
                    />
                    :
                    null
            }
            <div className={style['details-root-container']}>
                <div className={style['details-sub-container']}>
                    <h1 className={style['movie-title']}>
                        {movieTitle}
                    </h1>
                    <div className={style['details-container']}>
                        <div className={style['details']}>
                            <DateIcon
                                {...iconDetails}
                            />
                            <p>{showTime}</p>
                        </div>
                        <div className={style['details']}>
                            <TicketIcon
                                {...iconDetails}
                            />
                            <p>{totalTickets} Tickets</p>
                        </div>
                        <div className={style['details']}>
                            <SeatIcon
                                {...iconDetails}
                            />
                            <div className={style['booked-seats']}>
                                {
                                    bookedSeats.map((seat, index) => (
                                        <p key={index}>
                                            L{seat.layoutNumber}S{seat.setNumber}R{seat.rowNumber}S{seat.seatNumber}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full bg-foreground-theme-color/15" />
                <div className={style['details']}>
                    <UserIcon
                        {...iconDetails}
                    />
                    <p>Ref: {id}</p>
                </div>
            </div>
            <p className={status === "COMPLETED"? style['success-status']: style['error-status']}>
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