import { Hono } from "hono";
import { createPaymentIntentController } from "../controllers/checkout/createCheckout.controller.js";

// Checkout router
export const checkoutRouter = new Hono()

// Route for creating payment intent
checkoutRouter.post("/create-payment-intent", createPaymentIntentController)