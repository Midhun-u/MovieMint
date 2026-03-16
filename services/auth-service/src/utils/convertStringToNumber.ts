// Function for converting string to number
export const convertStringToNumber = (value: string | number, integer: boolean) => {

    return typeof value === "string"? (integer? parseInt(value): parseFloat(value)) : value

}