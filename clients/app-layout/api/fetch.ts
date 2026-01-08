import { envVariables } from "@/utils/envVariables"

const AUTH_BASE_URL = envVariables.AUTH_URL

// Function for authentication
export const auth = async (
    method: "POST" | "GET"| "PUT" | "DELETE",
    path: string,
    body: object = {},
    token?: string
) => {

    const response = await fetch(AUTH_BASE_URL + path, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json",
            "Autherization": `Bearer ${token}`
        }
    })

    const data = await response.json()
    return data

}