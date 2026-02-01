// Fetch instance
export const fetchInstance = async (
    baseUrl: string,
    path: string,
    method: "POST" | "GET" | "PUT" | "PATCH",
    body: object | null,
    authToken: string
) => {

    try {
       
        const response = await fetch(baseUrl + path, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken
            },
            body: method !== "GET"? JSON.stringify(body): null
        })
    
        const result = await response.json()
        return result

    } catch (error: any) {
        return {success: false, error: error.message}
    }

}