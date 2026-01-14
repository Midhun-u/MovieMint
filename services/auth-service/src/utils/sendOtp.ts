import { transporter } from "../config/nodemailer.js"
import { envVariables } from "./envVariables.js"
import { otpTemplate } from "./otpTemplate.js"

// Function for sending otp
export const sendOtp = async (email: string, otp: number, duration: number) => {

    try {

        await transporter.sendMail({
            from: envVariables.NODEMAILER_GMAIL_USER_EMAIL,
            to: email,
            subject: "OTP for verifying email",
            html: otpTemplate(otp, duration)
        })
        
    } catch (error: any) {
        console.log("sendOtp function error: ", error.message)
        return {success: false, error: error.message}
    }

}