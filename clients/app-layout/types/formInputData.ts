import { Role } from "./Role"

export type SignFormInputData = {
    firstname: string
    lastname: string
    email: string
    password: string
    role: Role
    adminKey: string
}

export type GoogleSignData = {
    firstname: string
    lastname: string
    email: string
    profilePic: string
    role: Role
}