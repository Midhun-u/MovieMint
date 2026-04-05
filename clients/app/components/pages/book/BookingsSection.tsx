'use client'

import { useParams, useRouter } from "next/navigation"
import MovieDetailsBanner from "../movies/MovieDetailsBanner"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import { movieFailed, movieRequest, movieSuccess } from "@/store/movieSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getMovieApi } from "@/api/movie"
import ShowTimeDetails from "./ShowTimeDetails"
import Spinner from "@/components/ui/Spinner"
import Image from "next/image"
import { assets } from "@/public/assets/assets"
import ShowCard from "./ShowCard"
import useObserver from "@/components/hooks/useObserver"
import { clearShowState, incrementPage, showFailed, showRequest, showSuccess } from "@/store/showSlice"
import { getAllShowsApi, getShowApi } from "@/api/shows"
import { TheaterDetails } from "@/types/theater"
import { getTheaterByIdApi } from "@/api/theater"
import TheaterSeatLayout from "@/components/layout/TheaterSeatLayout"
import {
    X as CloseIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SelectedSeat } from "@/types/selectedSeat"
import { createCheckoutSession } from "@/api/checkout"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { envVariables } from "@/utils/envVariables"
import PaymentForm from "./PaymentForm"
import { bookSeatApi, getBookedSeatsApi, getReservedSeatsApi, reserveSeatsApi } from "@/api/bookings"
import { bookingsFailed, bookingsRequest, bookingsSuccess } from "@/store/bookingsSlice"
import { Seat } from "@/types/seat"

const BookingsSection = () => {

    const { movieId } = useParams()
    const { shows, pagination, loading: showLoading, show } = useAppSelector(state => state.show)
    const { user } = useAppSelector(state => state.auth)
    const { theme } = useAppSelector(state => state.theme)
    const { movie } = useAppSelector(state => state.movie)
    const { loading: bookingsLoading } = useAppSelector(state => state.bookings)
    const dispatch = useAppDispatch()
    const [selectedDay, setSelectedDay] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [isRendered, setIsRendered] = useState<boolean>(false)
    const [showId, setShowId] = useState<string | null>(null)
    const [theaterId, setTheaterId] = useState<string | null>(null)
    const [theater, setTheater] = useState<TheaterDetails | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<Array<SelectedSeat>>([])
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [showPaymentScreen, setShowPaymentScreen] = useState<boolean>(false)
    const [stripePromsie, setStripePromise] = useState<Stripe | null>(null)
    const toastContext = useContext(ToastProvider)
    const [bookedSeats, setBookedSeats] = useState<Array<Seat>>([])
    const [userReservedSeats, setUserReservedSeats] = useState<Array<Seat>>([])
    const router = useRouter()
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false)
    const [ws, setWs] = useState<WebSocket | null>(null)

    // Function for fetching movie details
    const handleFetchMovieDetails = useCallback(async () => {

        dispatch(movieRequest())

        const result = await getMovieApi(movieId as string)
        if (result.success) {
            dispatch(movieSuccess({ movie: result.movie }))
        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }

    }, [movieId, dispatch])

    // Function for fetching shows
    const handleFetchShows = useCallback(async () => {

        dispatch(showRequest())

        const result = await getAllShowsApi(movieId as string, selectedDay, pagination.page, pagination.limit)
        if (result.success) {
            if (result.shows?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            dispatch(showSuccess({ shows: result.shows }))

        } else {
            dispatch(showFailed({ errorMessage: result.error }))
        }

    }, [movieId, pagination.page, pagination.limit, selectedDay, dispatch])

    // Function for fetching selected show
    const handleFetchSelectedShow = useCallback(async () => {

        dispatch(showRequest())

        const result = await getShowApi(showId as string)
        if (result.success) {
            dispatch(showSuccess({ show: result.show }))
        } else {
            dispatch(showFailed({ errorMessage: result.error }))
        }

    }, [showId, dispatch])

    // Function for fetching theater
    const handlFetchTheater = useCallback(async () => {

        const result = await getTheaterByIdApi(theaterId as string)
        if (result.success) {
            setTheater(result.theater)
        }

    }, [theaterId])

    // Function for creating payment intent
    const handleCheckout = async () => {

        const authToken = localStorage.getItem('authToken')
        if (!movie || !showId || !user || !authToken || !show) return

        if (!selectedSeats.length) {
            toastContext?.triggerToastMessage("Please select a seat before proceeding", "ERROR")
            return
        }

        // Checking if seats are already booked
        const bookedSeatSet = new Set(bookedSeats?.map(seat => seat? `${seat.layoutNumber}-${seat.rowNumber}-${seat.setNumber}-${seat.seatNumber}`: ""))
        const isBookedSeat = selectedSeats.some(seat => bookedSeatSet.has(`${seat.layoutNumber}-${seat.rowNumber}-${seat.setNumber}-${seat.seatNumber}`))
        if (isBookedSeat) {
            setShowPaymentScreen(false)
            toastContext?.triggerToastMessage("The selected seats are already booked, refresh the page", "ERROR")
            return
        }

        const set = new Set(userReservedSeats.map((seat) => `${seat.layoutNumber}-${seat.rowNumber}-${seat.setNumber}-${seat.seatNumber}`))
        const notReservedSeats = selectedSeats.filter((seat) => !set.has(`${seat.layoutNumber}-${seat.rowNumber}-${seat.setNumber}-${seat.seatNumber}`))

        const [paymentIntentResult] = await Promise.all([
            createCheckoutSession({
                movieId: movie._id,
                showId: showId,
                userId: user.id,
                amount: show.price * selectedSeats.length
            }),
            await reserveSeatsApi(showId as string, notReservedSeats, authToken)
        ])

        if (ws) {
            selectedSeats.map((selectedSeat) => {

                ws.send(JSON.stringify({
                    userId: user.id,
                    seat: selectedSeat,
                    showId: showId
                }))

            })
        }

        if (paymentIntentResult.success) {

            const stripePromise = await loadStripe(envVariables.STRIPE_API_KEY)
            if (stripePromise) {
                setStripePromise(stripePromise)
                setClientSecret(paymentIntentResult.clientSecret)
                setShowPaymentScreen(true)
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
            }

        } else {
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
        }

        setUserReservedSeats(pre => [...pre, ...selectedSeats])

    }

    // Function for creating bookings
    const handleBookSeats = async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken || !movie || !theater || !showId || !show) return

        dispatch(bookingsRequest())
        const result = await bookSeatApi({
            bookedSeats: selectedSeats,
            movieId: movie._id,
            showId: showId,
            theaterId: theater.id,
            authToken: authToken,
            price: selectedSeats.length * show?.price
        })

        if (result.success) {
            dispatch(bookingsSuccess({ bookings: result.bookings }))
            toastContext?.triggerToastMessage("Seats are booked", "SUCCESS")
            router.push("/bookings")
        } else {
            dispatch(bookingsFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }

    }

    // Function for fetching booked seats
    const handleFetchBookedSeats = useCallback(async () => {

        const result = await getBookedSeatsApi(showId as string)
        if (result.success) {
            setBookedSeats(result.bookedSeats)
        }

    }, [showId])

    // Function for fetching reserved seats
    const handleFetchReservedSeats = useCallback(async () => {

        if (!showId || !user) return

        const result = await getReservedSeatsApi(showId as string)
        if (result.success) {
            const seats = result.reservedSeats?.map(((reserveSeat: { userId: string, seat: Seat }) => {
                if (reserveSeat && reserveSeat.userId !== user.id) {
                    return reserveSeat.seat
                } else if (reserveSeat) {
                    setUserReservedSeats((pre) => [...pre, reserveSeat.seat])
                }
            }))
            setBookedSeats((pre) => [...pre, ...seats])
        }

    }, [showId, user])

    useEffect(() => {
        if (!movieId) return
        (() => {
            handleFetchMovieDetails()
        })()
    }, [handleFetchMovieDetails, movieId])

    useEffect(() => {
        (() => {
            (() => {
                setIsRendered(true)
            })()
            if (isRendered) {
                handleFetchShows()
            }
        })()

        return () => {
            if(isRendered){
                dispatch(clearShowState())
            }
        }
    }, [handleFetchShows, isRendered, dispatch])

    useEffect(() => {

        if (!isIntersecting || showLoading || !hasMore) return

        dispatch(incrementPage())

    }, [isIntersecting, hasMore, showLoading, dispatch])

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                handleFetchSelectedShow(),
                handlFetchTheater(),
                handleFetchBookedSeats(),
                handleFetchReservedSeats()
            ])
        }
        if (showId && theaterId) {
            fetchData()
        }
    }, [handleFetchSelectedShow, handlFetchTheater, handleFetchBookedSeats, handleFetchReservedSeats, showId, theaterId])

    useEffect(() => {

        const socket = new WebSocket(envVariables.BOOKINGS_WEBSOCKET_URL)
        socket.onopen = () => {
            setIsSocketConnected(true)
            setWs(socket)
        }

        socket.onmessage = (event) => {
            const { data } = event

            try {
                const parsedData = JSON.parse(data)
                if (showId && parsedData.showId === showId && parsedData.userId !== user?.id) {
                    setBookedSeats(pre => [...pre, parsedData.seat])
                }
            } catch { }
        }

        return () => {
            if (isSocketConnected) {
                socket.close()
            }
        }

    }, [isSocketConnected, showId, user])

    return (
        movie
            ?
            <div className="w-full mt-15 items-center flex flex-col gap-10">
                {/* Movie details */}
                <MovieDetailsBanner
                    showRateButton
                    showBookButton={false}
                    movieId={movieId as string}
                />
                {
                    show && theater
                        ?
                        <div className="w-full mt-5 px-3">
                            <TheaterSeatLayout
                                preview={false}
                                layoutNumber={theater.layout_number}
                                rowNumber={theater.rows_number}
                                seatNumber={theater.seats_number}
                                setsNumber={theater.sets_number}
                                setSelectedSeats={setSelectedSeats}
                                selectedSeats={selectedSeats}
                                limit={10}
                                selectedSeatsLength={selectedSeats.length}
                                bookedSeats={bookedSeats}
                            />
                            <div className="flex flex-wrap gap-2.5 mt-12 w-full justify-center px-2.5">
                                <div className="flex gap-1.25 items-center">
                                    <div className="w-5 h-5 bg-foreground-color border border-foreground-theme-color/15 rounded-[5px]"></div>
                                    <span className="text-sm font-medium">Available</span>
                                </div>
                                <div className="flex gap-1.25 items-center">
                                    <div className="w-5 h-5 bg-foreground-color border border-foreground-theme-color/15 rounded-[5px] flex justify-center items-center">
                                        <CloseIcon
                                            size={15}
                                        />
                                    </div>
                                    <span className="text-sm font-medium">Occupied</span>
                                </div>
                                <div className="flex gap-1.25 items-center">
                                    <div className="w-5 h-5 bg-primary-color border border-primary-color rounded-[5px]"></div>
                                    <span className="text-sm font-medium">Selected</span>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="sm:w-[95%] md:w-[60%] w-full p-2.5 bg-foreground-color mt-10 flex justify-between gap-2.5 items-center rounded-[10px] flex-wrap border border-foreground-theme-color/15">
                                    <div>
                                        <p className="text-[0.7rem] font-medium text-foreground-theme-color/60">Selected Seats</p>
                                        <span className="text-xs font-bold">{selectedSeats.length} Seats</span>
                                    </div>
                                    <Button
                                        className="w-50 max-[500px]:w-full max-[500px]:mt-2 text-[0.9rem]"
                                        size={"sm"}
                                        onClick={() => handleCheckout()}
                                    >
                                        <>Proceed</>
                                    </Button>
                                </div>
                            </div>
                            {/* Payment screen */}
                            {
                                showPaymentScreen && stripePromsie && clientSecret && user
                                    ?
                                    <div className="w-full h-full absolute top-15 left-0 z-5 flex">
                                        {/* Background */}
                                        <div className="w-full h-full absolute left-0 top-0 z-1 bg-foreground-color opacity-[0.5]"></div>
                                        <div className="w-full flex justify-center h-full pb-2.5">
                                            <Elements
                                                stripe={stripePromsie}
                                                options={{
                                                    clientSecret: clientSecret
                                                }}
                                            >
                                                <PaymentForm
                                                    amount={show.price * selectedSeats.length}
                                                    setShowPaymentScreen={setShowPaymentScreen}
                                                    onSuccess={() => bookingsLoading ? null : handleBookSeats()}
                                                />
                                            </Elements>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        <>
                            {/* Selected day */}
                            <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] w-full">
                                <ShowTimeDetails
                                    selectedDay={selectedDay}
                                    setSelectedDay={setSelectedDay}
                                />
                            </div>
                            {/* Shows */}
                            {
                                shows.length
                                    ?
                                    <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] mt-3 w-full">
                                        <div className="flex flex-col gap-5 w-full">
                                            {
                                                shows.map((show) => (
                                                    <ShowCard
                                                        key={show._id}
                                                        theaterImage={show.theater_image.image_url}
                                                        theaterName={show.theater_name}
                                                        allowCancellation={show.allow_cancellation}
                                                        shows={show.shows}
                                                        onClickShow={(id) => {
                                                            setShowId(id)
                                                            setTheaterId(show._id)
                                                        }}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    (
                                        !showLoading
                                            ?
                                            <div className="px-3 sm:w-[95%] sm:px-0 md:w-[70%] mt-5 w-full h-auto flex flex-col items-center justify-center gap-5">
                                                <Image
                                                    src={assets.voidVector}
                                                    alt="Not found vector image"
                                                    className="aspect-auto w-60 sm:w-70"
                                                />
                                                <p className="text-md font-medium text-center">There are no shows available at this time.</p>
                                            </div>
                                            :
                                            null

                                    )
                            }
                            <Activity mode={shows.length && hasMore && !showLoading ? "visible" : "hidden"}>
                                <div ref={ref}></div>
                            </Activity>
                            <Activity mode={showLoading ? "visible" : "hidden"}>
                                <Spinner
                                    color={theme === "dark" ? "white" : "black"}
                                    size={25}
                                />
                            </Activity>
                        </>
                }
            </div>
            :
            null
    )

}

export default BookingsSection