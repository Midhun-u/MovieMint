'use client'

import { getUserBookingsApi } from "@/api/bookings"
import useObserver from "@/components/hooks/useObserver"
import TabBar from "@/components/layout/TabBar"
import { bookingsRequest, bookingsSuccess, clearBookingsState, incrementPage } from "@/store/bookingsSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Activity, useCallback, useEffect, useState } from "react"
import BookingCard from "./BookingCard"
import NoResult from "@/components/ui/NoResult"
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"
import Spinner from "@/components/ui/Spinner"

const BookingsList = () => {

    const [tabBarValue, setTabBarValue] = useState<string>("")
    const { userBookings, loading, pagination } = useAppSelector(state => state.bookings)
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [isRendered, setIsRendered] = useState<boolean>(false)

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
                userBookings.length
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
                                />
                            ))
                        }
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
        </div>
    )

}

export default BookingsList