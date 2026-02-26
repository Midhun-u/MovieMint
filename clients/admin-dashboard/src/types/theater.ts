export type Theater = {
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
    status: "PENDING" | "AVAILABLE" | "NOT_AVAILABLE"
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

export type TheaterList = {
    id: string
    theater_name: string
    theater_location: string
    layout_number: number
    sets_number: number
    rows_number: number
    seats_number: number
    status: "PENDING"
    theater_owner: {
        id: string
        firstname: string
        lastname: string
        email: string
        profile_image: {
            id: string
            image_url: string
        }
        role: "THEATER_OWNER"
    }
    theater_image: {
        id: string
        image_url: string
    }
    createdAt: string
}