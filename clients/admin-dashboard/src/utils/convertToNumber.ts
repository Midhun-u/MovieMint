// Function for converting string to number
export const convertToNumber = (value: string | number): number => {
    if(typeof value === "string"){
        return parseInt(value)
    }else{
        return value
    }
}