import { Op } from "sequelize"
import { User } from "../schemas/user.schema.js"
import type { Role } from "../types/role.js"
import type { FastifyReply } from "fastify"

type UserData = {
    firstname: string,
    lastname: string,
    email: string,
    password?: string,
    auth_type: "EMAIL" | "GOOGLE",
    role: Role,

}

export const UserModel = {

    getUserByEmail: async (email: string) => {

        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })

        return user

    },

    addUser: async (userData: UserData) => {

        const newUser = await User.create({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.password,
            auth_type: userData.auth_type,
            role: userData.role
        })

        const {password, ...newUserData} = newUser.dataValues
        return newUserData

    },

    deleteUser: async (userId: string) => {

        const data = await User.destroy({
            where: {
                id: {
                    [Op.eq]: userId
                }
            }
        })

        return data

    }

}