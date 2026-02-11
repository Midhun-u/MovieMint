export type TheaterDetails = {
    id: string
    theater_name: string
    theater_location: string
    formats: Array<string>
    allow_cancellation: boolean
    layout_number: number
    sets_number: number
    rows_number: number
    seats_number: number
    owner_id: string
    status: "PENDING" | "AVAILABLE"
    theater_owner: {
        id: string
        firstname: string
        lastname: string
        email: string
        auth_type: string
        role: "THEATER_OWNER"
        profile_image: {
            image_id: string
            image_url: string
        }
    }
    theater_image: {
        id: string
        image_url: string
    }
    createdAt: string

}