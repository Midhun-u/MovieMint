// Fetch instance
export const fetchInstance = async (
    baseurl: string,
    path: string,
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
    body: object = {},
    bodyType: "formData" | "json",
    token?: string
) => {


    const contentType = bodyType === "json"? {"Content-Type": "application/json"}: {} as object

    try {

        const response = await fetch(baseurl + path, {
            method: method,
            body: method !== "GET" ? (
                bodyType === "json"
                    ?
                    JSON.stringify(body)
                    :
                    body as FormData
            ) : null,
            headers: {
                ...contentType,
                "Authorization": token ? `Bearer ${token}` : ""
            },
            credentials: "include",
            cache: "no-store"
        })

        const data = await response.json() || null
        return data

    } catch (error: any) {
        return { success: false, error: error.message }
    }

}