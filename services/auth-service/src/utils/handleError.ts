import type { FastifyReply, FastifyRequest } from "fastify"

// Function for handling error
export const handleError = (fn: Function, errorMessage: string) => {

    return async (request: FastifyRequest, reply: FastifyReply) => {

        try {
           
            return await fn(request, reply)
            
        } catch (error) {
            console.log(`${errorMessage}: ${error}`)
        }

    }

}