'use client'

import { getUserBookingsApi } from "@/api/bookings"
import useObserver from "@/components/hooks/useObserver"
import TabBar from "@/components/layout/TabBar"
import { bookingsRequest, bookingsSuccess, clearBookingsState, incrementPage } from "@/store/bookingsSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Activity, useCallback, useEffect, useMemo, useState } from "react"
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

const detailsContainerClass = "flex gap-[7px] items-center overflow-hidden"
const iconDetails = {
    size: 19,
    strokeWidth: 1.7,
    className: "stroke-foreground-theme-color/50 shrink-0"
}
const detailsClass = "text-[0.8rem] text-foreground-theme-color/50 font-medium max-h-9.75 overflow-hidden break-all"


const BookingsList = () => {

    const [tabBarValue, setTabBarValue] = useState<string>("")
    const { userBookings, loading, pagination } = useAppSelector(state => state.bookings)
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [showTicketScreen, setShowTicketScreen] = useState<boolean>(false)
    const [bookingDetails, setBookingDetails] = useState<Bookings | null>(null)
    const [currentTime, setCurrentTime] = useState<number>(0)

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

    useEffect(() => {
        (() => {
            setIsRendered(true)
            if (isRendered) {
                handleGetBookings()
            }
        })()
    }, [handleGetBookings, isRendered])

    useEffect(() => {

        if (!isIntersecting || loading || !hasMore) return

        (() => {
            dispatch(incrementPage())
        })()

    }, [isIntersecting, loading, hasMore, dispatch])

    useEffect(() => {
        dispatch(clearBookingsState())
    }, [tabBarValue, dispatch])

    useEffect(() => {

        (() => {
            if (showTicketScreen && bookingDetails) {
                setCurrentTime(Date.now())
            }
        })()

    }, [bookingDetails, showTicketScreen])

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
                userBookings.length || loading
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
                        <Activity mode={loading ? "visible" : "hidden"}>
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
            <Activity mode={hasMore && !loading ? "visible" : "hidden"}>
                <div ref={ref}></div>
            </Activity>
            <Activity mode={loading && hasMore ? "visible" : "hidden"}>
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
                            <div className="p-1 cursor-pointer right-3 top-3 absolute rounded-full hover:bg-background-color">
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
                                    <Button size={"sm"} className="mt-2 border border-primary-color">
                                        <>Download Ticket</>
                                    </Button>
                                    {
                                        new Date(bookingDetails.createdAt).getTime() <= currentTime +( 23 * 59 * 59 * 1000) // Comparing 24 hours
                                            ?
                                            <Button className="border border-foreground-theme-color/15 bg-foreground-color hover:bg-background-color">
                                                <>Cancel Ticket</>
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