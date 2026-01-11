import type { Request, Response } from "express"

// Function for handling error
export const handleError = (fn: Function, errorMessage: string) => {

    return async (request: Request, response: Response) => {

        try {

            await fn(request, response)

        } catch (error) {

            console.log(`${errorMessage}: ${error}`)
            
            return response.status(500).json({ success: false, error: "Server error", statusCode: 500 })

        }

    }

}