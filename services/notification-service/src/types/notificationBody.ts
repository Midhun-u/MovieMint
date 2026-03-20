export type NotificationBody = {
    userId: string
    success: boolean
    type: "movie" | "payment"
    title: string
    message: string
    metadata: object
    availableDate?: string
}