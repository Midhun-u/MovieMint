import { Activity, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getBookingsApi } from "../../api/bookings"
import { bookingsFailed, bookingsRequest, bookingsSuccess, clearBookingsState, incrementPage } from "../../store/bookingsSlice"
import TabBar from "../layout/TabBar"
import style from '../../styles/bookings/bookingsList.module.scss'
import BookingCard from "./BookingCard"
import { convertIsoDateToNormalFormat } from "../../utils/convertIsoDateToNoramlFormat"
import NoResult from "../ui/NoResult"
import useObserver from "../hooks/useObserver"
import BookingsSkeleton from "./BookingsSkeleton"

const BookingsList = () => {

    const [hasMore, setHasMore] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { bookings, loading, pagination } = useAppSelector(state => state.bookings)
    const [status, setStatus] = useState<string>("")
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })

    // Function for fetching theater booking
    const handleFetchTheaterBookings = useCallback(async () => {

        dispatch(bookingsRequest())
        const result = await getBookingsApi(pagination.page, pagination.limit, status)
        if (result.success) {
            if (result.bookings.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            dispatch(bookingsSuccess({ bookings: result.bookings }))
        } else {
            dispatch(bookingsFailed({ errorMessage: result.error }))
        }

    }, [dispatch, pagination.page, pagination.limit, status])

    useEffect(() => {
        (() => {
            handleFetchTheaterBookings()
        })()
    }, [handleFetchTheaterBookings])

    useEffect(() => {

        if (!isIntersecting || loading || !hasMore) return

        dispatch(incrementPage())

    }, [isIntersecting, hasMore, loading, dispatch])
    
    useEffect(() => {

        dispatch(clearBookingsState())

    }, [status, dispatch])

    return (
        <div className={style['container']}>
            <TabBar
                activeValue={status}
                setValue={setStatus}
                values={[
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
            />
            <div className={style['list']}>
                {
                    bookings.map(booking => (
                        <BookingCard
                            key={booking?._id}
                            bookedSeats={booking?.booked_seats}
                            id={booking?._id}
                            moviePoster={booking?.movie?.poster?.image_url}
                            movieTitle={booking?.movie?.title}
                            showTime={convertIsoDateToNormalFormat(new Date(booking.show.year, booking.show.month, booking.show.day, booking.show.hour, booking.show.minutes).toISOString())}
                            status={booking?.status}
                            totalTickets={booking?.booked_seats?.length}
                            userImage={booking?.user?.profile_image?.image_url}
                            userName={booking?.user?.firstname + " " +booking?.user?.lastname}
                            userEmail={booking?.user?.email}
                            theaterImage={booking?.theater?.theater_image?.image_url}
                            theaterName={booking?.theater?.theater_name}
                        />
                    ))
                }
                <Activity mode={loading? "visible": "hidden"}>
                    {
                        Array(3).fill("").map((_, index) => (
                            <BookingsSkeleton
                                key={index}
                            />
                        ))
                    }
                </Activity>
            </div>
            <Activity mode={!loading && hasMore ? "visible" : "hidden"}>
                <div ref={ref}></div>
            </Activity>
            {
                !bookings.length
                    ?
                    <NoResult
                    />
                    :
                    null
            }
        </div>
    )

}

export default BookingsList