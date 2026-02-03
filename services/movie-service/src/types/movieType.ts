export type MovieType = {
    title: string
    subheading: string
    synopsis: string
    language: string
    certificate: string
    categories: Array<string>
    formats: Array<string>
    releaseDate: string
    trailer: string
    duration: {
        hour: number
        minutes: number
        seconds: number
    }
    type: "LIVE_ACTION" | "ANIMATED"
    actors?: Array<{
        name: string,
    }>
}