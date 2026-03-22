export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    auth_type: string,
    profile_image: {
        image_url: string,
        id: string,
        user_id: string
    }
}