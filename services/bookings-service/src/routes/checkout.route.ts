import { Hono } from "hono";
import { createCheckoutSessionController } from "../controllers/checkout/createCheckout.controller.js";

// Checkout router
export const checkoutRouter = new Hono()

// Route for creating checkout session
checkoutRouter.post("/create-checkout", createCheckoutSessionController)