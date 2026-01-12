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

// Google sign body
export type GoogleSignBody = {
    firstname: string
    lastname: string
    email: string
    profilePic: string
    role: Role
}

// Login body
export type LoginBody = {
    email: string,
    password: string,
    role: Role,
    adminKey: string
}