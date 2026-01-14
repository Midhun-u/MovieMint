// Function for generating OTP
export const generateOtp = (digitsLength: number, durationNumber: number) => {

    const otpLength = parseInt("".toString().padEnd(digitsLength, "9"))

    const otp = Math.floor(Math.random() * otpLength)
    return otp

}