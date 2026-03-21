import { Hono } from "hono";
import { addNotificationController } from "../controllers/addNotification.controller";
import { getNotificationsController } from "../controllers/getNotifications.controller";
import { authMiddleware } from "../middlewares/auth";
import { deleteNotificationController } from "../controllers/deleteNotification.controller";
import { getMovieNotificationController } from "../controllers/getMovieNotification.controller";

// Notification router
export const notificationRouter = new Hono()

notificationRouter.use(authMiddleware)

// Route for adding notification
notificationRouter.post("/add-notification", addNotificationController)

// Route for getting all notifications
notificationRouter.get("/get-notifications", getNotificationsController)

// Route for deleting notifications
notificationRouter.delete("/delete-notification/:id", deleteNotificationController)

// Route for getting specific notification
notificationRouter.get("/get-movie-notification/:movieId", getMovieNotificationController)