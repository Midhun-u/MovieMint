export type Show = {
    _id: string
    theater_id: string
    movie_id: string
    price: number
    day: number
    hour: number
    minutes: number
    year: number
    month: number
    status: "SHOWING" | "NOT_SHOWING"
    createdAt: string
    movie: {
        title: string
        language: string
        certificate: string
        categories: Array<string>
        formats: Array<string>
        poster: {
            id: string
            image_url: string
        }
    }
}