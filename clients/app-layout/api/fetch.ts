import { handleError } from "@/utils/handleError";

// Fetch instance
export const fetchInstance = handleError(async (
    baseurl: string,
    path: string,
    method: "POST" | "GET" | "PUT" | "DELETE",
    body: object = {},
    token?: string
) => {

    const response = await fetch(baseurl + path, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })

    const data = await response.json()
    return data

})