import type { Role } from "./role.js"

// Sign request body
export interface SignBody{
    firstname: string
    lastname: string
    email: string
    password: string
    role: Role
    adminKey: string
}