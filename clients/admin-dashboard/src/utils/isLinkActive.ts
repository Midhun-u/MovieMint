// Function for checking if current link is active
export const isLinkActive = (pathname: string, route: string) => {

    if (route === pathname) {
        return true
    } else {
        return false
    }

}