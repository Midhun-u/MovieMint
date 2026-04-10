export type NotificationBody = {
    userId: string
    success: boolean
    type: "movie" | "payment" | "theater"
    title: string
    message: string
    metadata: object
    availableDate?: string
}