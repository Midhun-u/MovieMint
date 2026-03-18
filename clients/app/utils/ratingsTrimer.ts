// Function for triming ratings
export const ratingsTimer = (rate: number) => {

    const trimmedValue = Math.floor(rate * 10) / 10
    return trimmedValue

} 