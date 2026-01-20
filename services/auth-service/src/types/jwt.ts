import type { Role } from "./role.js"

export type JWT_PAYLOAD = {
    id: string,
    name: string,
    role: Role,
    email: string
}