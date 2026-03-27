import type { Context } from "hono";
import { sendErrorResponse } from "../../utils/sendErrorResponse.js";

// Controller for creating checkout session
export const createCheckoutSessionController = sendErrorResponse(async (context: Context) => {



}, "createCheckoutSessionController error")