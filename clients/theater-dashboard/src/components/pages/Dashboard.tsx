import { useCallback, useEffect } from "react";
import style from "../../styles/pages/dashboard.module.scss";
import DashboardLogs from "../dashboard/DashboardLogs";
import PageDetails from "../ui/PageDetails";
import { getTheaterBookingsApi } from "../../api/bookings";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { bookingsRequest, bookingsSuccess } from "../../store/bookingsSlice";
import BookingCard from "../bookings/BookingCard";
import { convertIsoDateToNormalFormat } from "../../utils/convertIsoDateToNoramlFormat";
import NoResult from "../ui/NoResult";

const Dashboard = () => {

  const { theaterBookings } = useAppSelector(state => state.bookings)
  const dispatch = useAppDispatch()

  // Function for getting latest theater bookings
  const handleGetTheaterBookings = useCallback(async () => {

    dispatch(bookingsRequest())
    const result = await getTheaterBookingsApi(1, 10, "")
    if (result.success) {
      dispatch(bookingsSuccess({ theaterBookings: result.bookings }))
    }

  }, [dispatch])

  useEffect(() => {
    handleGetTheaterBookings()
  }, [handleGetTheaterBookings])

  return (
    <div className={style.container}>
      {/* Dashboard logs */}
      <div className={style["dashboard-logs-container"]}>
        <PageDetails
          title="Performance Overview"
          about="Real-time insights for today's theater operations and bookings."
          backButton={false}
        />
        <DashboardLogs />
        <div className={style['list-container']}>
          <PageDetails
            title="Latest Bookings"
            about="View your most recent movie ticket bookings, including show details, seat numbers, and payment status."
            backButton={false}
          />
          <div className={style['list']}>
            {
              theaterBookings?.map(booking => (

                <BookingCard
                  key={booking?._id}
                  bookedSeats={booking?.booked_seats}
                  id={booking?._id}
                  moviePoster={booking?.movie?.poster?.image_url}
                  movieTitle={booking?.movie?.title}
                  showTime={convertIsoDateToNormalFormat(new Date(booking.show.year, booking.show.month, booking.show.day, booking.show.hour, booking.show.minutes).toISOString())}
                  status={booking.status}
                  totalTickets={booking.booked_seats.length}
                />

              ))
            }
          </div>
          {
            !theaterBookings.length
              ?
              <NoResult
              />
              :
              null
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
