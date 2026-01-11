type Method = "GET" | "POST" | "PUT" | "DELETE"

// Fetch instance
export const fetchInstance = async (baseUrl: string, method: Method, path: string, data?: object) => {

    try {
        
        const response = await fetch(baseUrl + path, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()
        return result

    } catch (error: any) {
        
        return {success: false, errorMessage: error.message}

    }

}