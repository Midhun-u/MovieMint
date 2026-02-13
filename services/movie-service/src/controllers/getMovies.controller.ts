import { Context } from "hono";
import { sendErrorResponse } from "../utils/sendErrorResponse";

// Controller for getting movies
export const getMoviesController = sendErrorResponse(async (context: Context) => {

    console.log("Hello world")

}, "getMoviesController error")