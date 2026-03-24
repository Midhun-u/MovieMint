export type Theater = {
    id: string,
    theater_name: string,
    theater_location: string,
    formats: string[],
    allow_cancellation: boolean,
    layout_number: number,
    sets_number: number,
    rows_number: number,
    seats_number: number,
    owner_id: string,
    status: string,
    theater_owner: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
        auth_type: string,
        role: string,
        profile_image: {
            image_id: string,
            image_url: string
        }
    },
    theater_image: {
        id: string,
        image_url: string
    },
    createdAt: string
}