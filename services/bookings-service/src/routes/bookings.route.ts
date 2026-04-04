import { Hono } from "hono";
import { addBookingsController } from "../controllers/bookings/addBookings.controller.js";
import { getBookedSeatsController } from "../controllers/bookings/getBookedSeats.controller.js";
import { reserveSeatsController } from "../controllers/bookings/reserverSeats.controller.js";
import { getReservedSeatsController } from "../controllers/bookings/getReservedSeats.controller.js";
import { getUserBookingsController } from "../controllers/bookings/getUserBookings.controller.js";
import { getLogsController } from "../controllers/bookings/getLogs.controller.js";
import { theaterOwnerAuthMiddleware } from "../middlewares/theaterOwnerAuth.js";
import { userAuthMiddleware } from "../middlewares/userAuth.js";
import { getTheaterBookingsController } from "../controllers/bookings/getTheaterBookings.controller.js";

// Bookings router
export const bookingsRouter = new Hono()

// Applying middleware
bookingsRouter.use(theaterOwnerAuthMiddleware)
bookingsRouter.use(userAuthMiddleware)

// Route for creating bookings
bookingsRouter.post("/add-bookings", addBookingsController)

// Route for getting booked seats
bookingsRouter.get("/get-booked-seats/:showId", getBookedSeatsController)

// Route for reserve seats
bookingsRouter.post("/reserve-seats", reserveSeatsController)

// Route for getting reserved seats
bookingsRouter.get("/get-reserved-seats/:showId", getReservedSeatsController)

// Route for getting user bookings
bookingsRouter.get("/get-user-bookings", getUserBookingsController)

// Route for getting theater bookings
bookingsRouter.get("/get-theater-bookings", getTheaterBookingsController)

// Route for getting logs
bookingsRouter.get("/get-logs", getLogsController)