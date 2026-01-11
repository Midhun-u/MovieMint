import type { Response } from "express";

type ResponseData = {
    success: boolean,
    statusCode: number,
    error?: string | null,
    message?: string | null,
    data?: object | null
}

// Function for sending response
export const sendResponse = (response: Response, success: boolean, statusCode: number, errorMessage?: string | null, data?: object | null, message?: string | null) => {

    let responseData: ResponseData | null = {
        success: success,
        statusCode: statusCode
    }

    if(errorMessage){
        responseData.error = errorMessage
    }

    if(data){
        responseData.data = data
    }

    if(message){
        responseData.message = message
    }

    return response.status(statusCode).json(responseData)

}