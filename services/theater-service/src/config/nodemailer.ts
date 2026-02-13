import * as nodemailer from 'nodemailer'
import { envVariables } from '../utils/envVariables.js'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: envVariables.NODEMAILER_GMAIL_USER_EMAIL,
        pass: envVariables.NODEMAILER_GMAIL_APP_PASSWORD
    }
})