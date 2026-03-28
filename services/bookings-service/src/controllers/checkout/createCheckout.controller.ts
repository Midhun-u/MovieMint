import type { Context } from "hono";
import {Stripe} from 'stripe'
import { envVariables } from "../../utils/envVariables.js";
import { checkoutValidator } from "../../validator/checkoutBodyValidator.js";
import type { CheckoutBody } from "../../types/checkoutBody.js";

const stripe = new Stripe(envVariables.STRIPE_API_KEY)

// Controller for creating payment intent
export const createPaymentIntentController = async (context: Context) => {

    const body = await context.req.json() as CheckoutBody || {}

    const {success, fields, errorMessage} = checkoutValidator(body)

    if(!success || !fields || errorMessage){
        context.status(400)
        return context.json({success: false, error: "Invalid fields", statusCode: 400})
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: fields.amount * 100,
        currency: "inr",
        metadata: {
            movieId: fields.movieId,
            showId: fields.showId,
            userId: fields.userId
        },
        payment_method_types: ['card', 'upi'],
    })

    return context.json({success: true, id: paymentIntent.id, clientSecret: paymentIntent.client_secret})

}