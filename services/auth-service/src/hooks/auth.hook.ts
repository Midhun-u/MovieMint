import type { FastifyReply, FastifyRequest } from "fastify";

// Hook for checking authenticated
export const authenticationHook = async (request: FastifyRequest, reply: FastifyReply) => {

    const authToken = request.headers.authorization

    if(!authToken){
        reply.status(401)
        reply.send({success: false, error: "Unauthorized user", statusCode: 401})
    }

    await request.jwtVerify()
    
    return

}