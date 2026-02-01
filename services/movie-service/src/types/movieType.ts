export type MovieType = {
    title: string
    subheading: string
    synopsis: string
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
        actorName: string,
    }>
}