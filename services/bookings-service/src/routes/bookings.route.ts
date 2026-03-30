import { Hono } from "hono";
import { addBookingsController } from "../controllers/bookings/addBookings.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { getBookedSeatsController } from "../controllers/bookings/getBookedSeats.controller.js";
import { reserveSeatsController } from "../controllers/bookings/reserverSeats.controller.js";
import { getReservedSeatsController } from "../controllers/bookings/getReservedSeats.controller.js";

// Bookings router
export const bookingsRouter = new Hono()

bookingsRouter.use(authMiddleware)

// Route for creating bookings
bookingsRouter.post("/add-bookings", addBookingsController)

// Route for getting booked seats
bookingsRouter.get("/get-booked-seats/:showId", getBookedSeatsController)

// Route for reserve seats
bookingsRouter.post("/reserve-seats", reserveSeatsController)

// Route for getting reserved seats
bookingsRouter.get("/get-reserved-seats/:showId", getReservedSeatsController)