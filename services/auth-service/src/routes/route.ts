import { type FastifyInstance } from "fastify";
import { signController } from "../controllers/sign.controller.js";
import { googleSignController } from "../controllers/googleSign.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { googleLoginController } from "../controllers/googleLogin.controller.js";
import { sendOtpController } from "../controllers/sendOtp.controller.js";
import { verifyOtpController } from "../controllers/verifyOtp.controller.js";

// Auth routes
export const authRoutes = (fastify: FastifyInstance) => {

    // Route for signing
    fastify.post("/sign", signController)

    // Route for google signing
    fastify.post("/google-sign", googleSignController)

    // Route for login
    fastify.post("/login", loginController)

    // Route for google login
    fastify.post("/google-login", googleLoginController)

    // Route for sending OTP
    fastify.post("/send-otp", sendOtpController)

    // Route for verifying OTP
    fastify.post("/verify-otp", verifyOtpController)

}