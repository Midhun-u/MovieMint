import type { FastifyReply, FastifyRequest } from "fastify"

// Function for handling error
export const handleError = (fn: Function, errorMessage: string) => {

    return async (request: FastifyRequest, reply: FastifyReply) => {

        try {
           
            return await fn(request, reply)
            
        } catch (error) {
            console.log(`${errorMessage}: ${error}`)

            reply.status(500)
            return {success: false, error: "Server error", statusCode: 500}
        }

    }

}