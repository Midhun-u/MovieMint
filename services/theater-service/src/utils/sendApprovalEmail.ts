import { transporter } from "../config/nodemailer"
import { envVariables } from "./envVariables"
import { theaterApprovedTemplate } from "./theaterApprovedTemplate"

export const sendApprovalEmail = async (email: string) => {

    if (!email) return

    try {

        await transporter.sendMail({
            from: envVariables.NODEMAILER_GMAIL_USER_EMAIL,
            to: email,
            subject: "Theater Registration",
            html: theaterApprovedTemplate()
        })

    } catch (error: any) {
        console.log(`Couldn't send email ${error}`)
    }

}