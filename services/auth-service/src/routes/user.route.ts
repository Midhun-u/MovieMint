import { type FastifyInstance } from "fastify";
import { signController } from "../controllers/user/sign.controller.js";
import { googleSignController } from "../controllers/user/googleSign.controller.js";
import { loginController } from "../controllers/user/login.controller.js";
import { googleLoginController } from "../controllers/user/googleLogin.controller.js";
import { sendOtpController } from "../controllers/user/sendOtp.controller.js";
import { verifyOtpController } from "../controllers/user/verifyOtp.controller.js";
import { resetPasswordController } from "../controllers/user/resetPassword.controller.js";
import { getAuthProfileController } from "../controllers/user/getAuthProfile.controller.js";
import { authenticationHook } from "../hooks/auth.hook.js";
import { getUserController } from "../controllers/user/getUser.controller.js";
import { updateUserController } from "../controllers/user/updateUser.controller.js";

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

    // Route for resetting password
    fastify.patch("/reset-password", resetPasswordController)

    // Route for getting auth profile
    fastify.get("/auth-profile", {onRequest: authenticationHook} ,getAuthProfileController)

    // Route for getting a specific user
    fastify.get("/get-user/:userId", getUserController)

    // Route for updating user
    fastify.patch("/update-user", {onRequest: authenticationHook}, updateUserController)

}