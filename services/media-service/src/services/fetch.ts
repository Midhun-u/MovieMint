// Fetch instance
export const fetchInstance = async (
    baseUrl: string,
    path: string,
    method: "GET" | "PUT" | "POST" | "PATCH" | "DELETE",
    body: object | null,
    authToken?: string
) => {

    try {
        
        const response = await fetch(baseUrl + path, {
            method: method,
            body: method !== "GET"? JSON.stringify(body): null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken? authToken: ""
            }
        })

        const result = await response.json()
        return result

    } catch (error: any) {
        return {success: false, errorMessage: error.message}
    }

}