import type { FastifyReply } from "fastify"


// Function for generating token
export const generateToken = async(reply: FastifyReply, payload: {
    id: string,
    name: string,
    email: string,
    auth_type: "EMAIL" | "GOOGLE"
}) => {

    const token = reply.jwtSign(payload)
    return token

}