export type AddMovieData = {
    title: string
    subheading: string
    synopsis: string
    language: string
    certificate: string
    categories: Array<string>
    formats: Array<string>
    releaseDate: Date
    trailer: string
    duration: {
        hour: number
        minutes: number
        seconds: number
    }
    type: "LIVE_ACTION" | "ANIMATED"
    actors?: Array<{
        name: string
    }>
}

export type MovieData = Omit<AddMovieData, "trailer" | "subheading" | "releaseDate"> & {
    _id: string
    movie_trailer: string
    poster: {
        id: string
        image_url: string
    }
    banner: {
        id: string
        image_url: string
    }
    sub_heading: string
    release_date: string
    status: "SHOWING" | "NOT_SHOWING" | "PENDING"
}