// Function for converting numbers (eg: 1000 -> 1K, 1000000 -> 1M)
export const formatNumber = (data: number) => {

        const value = Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(data)

        return value
}