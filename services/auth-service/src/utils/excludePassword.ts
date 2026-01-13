// Function for excluding password
export const excludePassword = (userData: object) => {

    const {password, ...otherUserData} = userData as any
    return otherUserData

}