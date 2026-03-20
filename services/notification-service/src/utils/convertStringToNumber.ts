// Function for converting string to number
export const convertStringToNumber = (value: string | number) => {

    return typeof value === "string"? parseInt(value): value

}