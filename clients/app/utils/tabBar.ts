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
        route: "/movies/pending"
    },
    {
        title: "Most Rated",
        route: "/movies/most-ratings"
    },
    {
        title: "Animated Movies",
        route: "/movies/animated-movies"
    }
]