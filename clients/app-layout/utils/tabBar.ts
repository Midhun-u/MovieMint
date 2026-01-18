type TabBarNavs = Array<{
    title: string,
    route: string
}>

export const tabBarNavs: TabBarNavs = [
    {
        title: "For You",
        route: "/movies"
    },
    {
        title: "All Movies",
        route: "/movies/all-movies"
    },
    {
        title: "Popular",
        route: "/movies/popular"
    },
    {
        title: "Coming Soon",
        route: "/movies/coming-soon"
    },
    {
        title: "Most Rated",
        route: "/movies/most-rated"
    },
    {
        title: "Latest",
        route: "/movies/latest"
    },
    {
        title: "Animated Movies",
        route: "/movies/animated-movies"
    }
]