import { convertStringToNumber } from "./convertStringToNumber.js"

// Function for getting random item from an array
const getRandomItem = (array: Array<any>) => {

    return array[Math.floor(Math.random() * array.length)]

}

// Function for generating OTP
export const generateOtp = (digitsLength: number) => {

    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let otp = ""

    for(let i = 1; i <= digitsLength; i ++){

        const randomStringDigit = getRandomItem(digits).toString()
        otp = otp + randomStringDigit

    }

    return convertStringToNumber(otp)
}