// Function for checking if current link is active
export const isLinkActive = (pathname: string, route: string) => {

    if (
        (pathname === "/" && route === "/") ||
        (pathname.includes(route) && route !== "/")
    ) {
        return true
    } else {
        return false
    }

}