import { handleError } from "@/utils/handleError";

// Fetch instance
export const fetchInstance = handleError(async (
    baseurl: string,
    path: string,
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
    body: object = {},
    token?: string
) => {
        
        const response = await fetch(baseurl + path, {
            method: method,
            body: method !== "GET"? JSON.stringify(body): null,
            headers: {
                "Content-type": "application/json",
                "Authorization": token? `Bearer ${token}`: ""
            },
            credentials: "include"
        })
    
        const data = await response.json() || null
        return data

})