// Function for converting ratings (eg: 1000 -> 1K, 1000000 -> 1M)
export const movieRatingsConvertor = (rate: number) => {

        const value = Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(rate)

        return value
}