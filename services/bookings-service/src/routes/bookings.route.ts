import { Hono } from "hono";
import { addBookingsController } from "../controllers/bookings/addBookings.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { getBookedSeatsController } from "../controllers/bookings/getBookedSeats.controller.js";

// Bookings router
export const bookingsRouter = new Hono()

bookingsRouter.use(authMiddleware)

// Route for creating bookings
bookingsRouter.post("/add-bookings", addBookingsController)

// Route for getting booked seats
bookingsRouter.get("/get-booked-seats/:showId", getBookedSeatsController)