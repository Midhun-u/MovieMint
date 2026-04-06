'use client'

import { cancelBookingApi, getUserBookingsApi } from "@/api/bookings"
import useObserver from "@/components/hooks/useObserver"
import TabBar from "@/components/layout/TabBar"
import { bookingsRequest, bookingsSuccess, clearBookingsState, incrementPage } from "@/store/bookingsSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import BookingCard from "./BookingCard"
import NoResult from "@/components/ui/NoResult"
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"
import Spinner from "@/components/ui/Spinner"
import BookingsSkeleton from "./BookingsSkeleton"
import {
    X as CloseIcon
} from 'lucide-react'
import { Bookings } from "@/types/bookings"
import Image from "next/image"
import {
    TheaterIcon,
    MapPinIcon as LocationIcon,
    Calendar as DateIcon,
    TicketIcon,
    Armchair as SeatIcon,
    UserIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import Jspdf from 'jspdf'

const detailsContainerClass = "flex gap-[7px] items-center overflow-hidden"
const iconDetails = {
    size: 19,
    strokeWidth: 1.7,
    className: "stroke-foreground-theme-color/50 shrink-0"
}
const detailsClass = "text-[0.8rem] text-foreground-theme-color/50 font-medium max-h-9.75 overflow-hidden break-all"


const BookingsList = () => {

    const [tabBarValue, setTabBarValue] = useState<string>("")
    const { userBookings, loading: bookingLoading, pagination } = useAppSelector(state => state.bookings)
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [showTicketScreen, setShowTicketScreen] = useState<boolean>(false)
    const [bookingDetails, setBookingDetails] = useState<Bookings | null>(null)
    const [cancelLoading, setCancelLoading] = useState<boolean>(false)
    const toastContext = useContext(ToastProvider)

    // Function for getting user bookings
    const handleGetBookings = useCallback(async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(bookingsRequest())
        const result = await getUserBookingsApi(pagination.page, pagination.limit, tabBarValue, authToken)
        if (result.success) {
            if (result.bookings?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            dispatch(bookingsSuccess({ userBookings: result.bookings }))
        }

    }, [dispatch, pagination.page, pagination.limit, tabBarValue])

    // Function for cancelling the booking
    const handleCancelBooking = async () => {

        if (!bookingDetails) return

        setCancelLoading(true)
        const result = await cancelBookingApi(bookingDetails._id)
        if (result.success) {
            toastContext?.triggerToastMessage("Show is cancelled", "SUCCESS")
        } else {
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }

        setCancelLoading(false)

    }

    // Function for downloading ticket
    const handleDownloadTicket = async () => {

        if(!bookingDetails) return

        const pdf  = new Jspdf("landscape")

        pdf.setFontSize(16)
        pdf.text(`Movie Name: ${bookingDetails.movie.title}`, 10, 20)
        pdf.text(`Theater Name: ${bookingDetails.theater.theater_name}`, 10, 30 )
        pdf.text(`Theater Location: ${bookingDetails.theater.theater_location}`, 10, 40)
        pdf.text(`Show Time: ${convertIsoDateToNormalFormat(new Date(bookingDetails.show.year, bookingDetails.show.month, bookingDetails.show.day, bookingDetails.show.hour, bookingDetails.show.minutes).toISOString())}`, 10, 50)
        pdf.text(`Booked Seats: ${bookingDetails.booked_seats.map(bookedSeat => `L${bookedSeat.layoutNumber}S${bookedSeat.setNumber}R${bookedSeat.rowNumber}S${bookedSeat.seatNumber}`)}`, 10, 60)
        pdf.text(`Status: ${bookingDetails.status === "COMPLETED"? "Completed": "Cancelled"}`, 10, 70)

        pdf.save('booking-ticket.pdf')

    }

    useEffect(() => {
        (() => {
            setIsRendered(true)
            if (isRendered) {
                handleGetBookings()
            }
        })()
    }, [handleGetBookings, isRendered])

    useEffect(() => {

        if (!isIntersecting || bookingLoading || !hasMore) return

        (() => {
            dispatch(incrementPage())
        })()

    }, [isIntersecting, bookingLoading, hasMore, dispatch])

    useEffect(() => {
        dispatch(clearBookingsState())
    }, [tabBarValue, dispatch])

    return (
        <div className="flex flex-col gap-5">
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
            {
                userBookings.length || bookingLoading
                    ?
                    <div className="grid max-[800px]:grid-cols-[1fr] grid-cols-[repeat(2,1fr)] gap-2.5 h-full">
                        {
                            userBookings.map((booking) => (
                                <BookingCard
                                    key={booking._id}
                                    id={booking._id}
                                    moviePoster={booking?.movie?.poster?.image_url}
                                    movieTitle={booking.movie?.title}
                                    theaterLocation={booking.theater?.theater_location}
                                    theaterName={booking.theater.theater_name}
                                    showTime={convertIsoDateToNormalFormat(new Date(booking.show.year, booking.show.month, booking.show.day, booking.show.hour, booking.show.minutes).toISOString())}
                                    totalTickets={booking.booked_seats?.length || 0}
                                    bookedSeats={booking.booked_seats || []}
                                    status={booking.status}
                                    onClickOnCard={() => {
                                        setShowTicketScreen(true)
                                        setBookingDetails(booking)
                                    }}
                                />
                            ))
                        }
                        <Activity mode={bookingLoading ? "visible" : "hidden"}>
                            {
                                Array(3).fill("").map((_, index) => (
                                    <BookingsSkeleton
                                        key={index}
                                    />
                                ))
                            }
                        </Activity>
                    </div>
                    :
                    (
                        !userBookings.length
                            ?
                            <NoResult
                            />
                            :
                            null
                    )
            }
            <Activity mode={hasMore && !bookingLoading ? "visible" : "hidden"}>
                <div ref={ref}></div>
            </Activity>
            <Activity mode={bookingLoading && hasMore ? "visible" : "hidden"}>
                <div className="mt-2.5 w-full flex justify-center">
                    <Spinner
                        color={theme === "white" ? "black" : "black"}
                        size={25}
                    />
                </div>
            </Activity>
            {
                bookingDetails && showTicketScreen
                    ?
                    <div className="w-full z-5 px-2.5 absolute top-15 left-0 h-[calc(100%-60px)] flex justify-center">
                        <div className="w-full absolute h-full bg-foreground-color opacity-[0.5] z-0 overflow-scroll"></div>
                        <div className="h-[80%] p-5 cursor-all-scroll pt-12 bg-foreground-color border border-foreground-theme-color/30 w-112.5 relative top-20 rounded-[10px]">
                            <div onClick={() => {
                                setShowTicketScreen(false)
                                setBookingDetails(null)
                            }} className="p-1 cursor-pointer right-3 top-3 absolute rounded-full hover:bg-background-color">
                                <CloseIcon
                                    size={20}
                                />
                            </div>
                            <div className="w-full h-full flex flex-col gap-2.5 overflow-scroll">
                                {
                                    bookingDetails.movie.poster.image_url
                                        ?
                                        <Image
                                            src={bookingDetails.movie.poster.image_url}
                                            alt={`${bookingDetails.movie.title} poster image`}
                                            width={500}
                                            height={1000}
                                            className="aspect-2/3 h-auto w-37.5"
                                        />
                                        :
                                        null
                                }
                                <div className="w-full flex flex-col gap-2.5">
                                    <div className="flex flex-col gap-2.5">
                                        <h1 className="max-h-9.75 overflow-hidden text-[0.9rem] font-bold">
                                            {bookingDetails.movie.title}
                                        </h1>
                                        <div className="flex flex-col gap-1.25">
                                            <div className={detailsContainerClass}>
                                                <TheaterIcon
                                                    {...iconDetails}
                                                />
                                                <p className={detailsClass}>
                                                    {bookingDetails.theater.theater_name}
                                                </p>
                                            </div>
                                            <div className={detailsContainerClass}>
                                                <LocationIcon
                                                    {...iconDetails}
                                                />
                                                <p className={detailsClass}>{bookingDetails.theater.theater_location}</p>
                                            </div>
                                            <div className={detailsContainerClass}>
                                                <DateIcon
                                                    {...iconDetails}
                                                />
                                                <p className={detailsClass}>{convertIsoDateToNormalFormat(new Date(bookingDetails.show.year, bookingDetails.show.month, bookingDetails.show.day, bookingDetails.show.hour, bookingDetails.show.minutes).toISOString())}</p>
                                            </div>
                                            <div className={detailsContainerClass}>
                                                <TicketIcon
                                                    {...iconDetails}
                                                />
                                                <p className={detailsClass}>{bookingDetails.booked_seats.length} Tickets</p>
                                            </div>
                                            <div className={detailsContainerClass}>
                                                <SeatIcon
                                                    {...iconDetails}
                                                />
                                                <div className="flex flex-wrap gap-1.25">
                                                    {
                                                        bookingDetails.booked_seats.map((seat, index) => (
                                                            <p className={detailsClass + " flex-nowrap"} key={index}>
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
                                        <p className={detailsClass}>Ref: {bookingDetails._id}</p>
                                    </div>
                                    <p className={`w-min mt-1 py-0.5 font-medium px-2 text-[0.7rem] ${bookingDetails.status === "COMPLETED" ? "bg-success-background-color text-success-foreground-color" : "bg-error-background-color text-error-foreground-color"} rounded-[5px]`}>
                                        {
                                            bookingDetails.status === "COMPLETED"
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
                                    <Button
                                        size={"sm"}
                                        className="mt-2 border border-primary-color"
                                        onClick={() => handleDownloadTicket()}
                                    >
                                        <>Download Ticket</>
                                    </Button>
                                    {
                                        (new Date().getTime() + 10 * 60 * 1000 < new Date(bookingDetails.show.year, bookingDetails.show.month, bookingDetails.show.day, bookingDetails.show.hour).getTime()) &&
                                            bookingDetails.theater.allow_cancellation &&
                                            bookingDetails.status === "COMPLETED"
                                            ?
                                            <Button
                                                className="border border-foreground-theme-color/15 bg-foreground-color hover:bg-background-color text-foreground-theme-color"
                                                disabled={cancelLoading}
                                                onClick={() => handleCancelBooking()}
                                            >
                                                {
                                                    cancelLoading
                                                        ?
                                                        <Spinner
                                                            color={theme === "dark" ? "white" : "black"}
                                                            size={18}
                                                        />
                                                        :
                                                        <>Cancel Ticket</>
                                                }
                                            </Button>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )

}

export default BookingsList