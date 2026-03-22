export type Notification = {
    id: string
    user_id: string
    title: string
    message: string
    success: boolean
    type: "movie" | "payment"
    metadata: Record<string, any>
    is_read: boolean
}