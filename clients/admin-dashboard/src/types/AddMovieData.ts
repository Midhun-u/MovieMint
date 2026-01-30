export type AddMovieData = {
    title: string
    subheading: string
    synopsis: string
    posterId: string
    bannerId: string
    language: string
    certificate: string
    categories: Array<string>
    releaseDate: Date
    trailer: string
    duration: {
        hour: number
        minutes: number
        seconds: number
    }
    type: "LIVE_ACTION" | "ANIMATED"
    actors?: Array<{
        actorName: string
        imageId: string
    }>
}