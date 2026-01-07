import type { FastifyReply } from "fastify"
import type { Role } from "../types/role.js"


// Function for generating token
export const generateToken = async(reply: FastifyReply, payload: {
    id: string,
    name: string,
    email: string,
    role: Role
}) => {

    const token = reply.jwtSign(payload)
    return token

}