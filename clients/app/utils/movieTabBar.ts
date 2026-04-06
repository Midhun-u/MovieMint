type MovieTabBar = Array<{
    title: string,
    route: string
}>

export const movieTabBar: MovieTabBar = [
    {
        title: "For You",
        route: "/movies"
    },
    {
        title: "All Movies",
        route: "/movies/all-movies"
    },
    {
        title: "Coming Soon",
        route: "/movies/pending"
    },
    {
        title: "Most Rated",
        route: "/movies/most-rated"
    },
    {
        title: "Animated Movies",
        route: "/movies/animated-movies"
    }
]