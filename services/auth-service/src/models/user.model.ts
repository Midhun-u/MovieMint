import { Op } from "sequelize"
import { User } from "../schemas/user.schema.js"
import type { Role } from "../types/role.js"

type AuthType = "EMAIL" | "GOOGLE"
type UserData = {
    firstname: string,
    lastname: string,
    email: string,
    password?: string,
    auth_type: AuthType,
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

        return user?.dataValues

    },
    
    getUserByEmailWithAuthType: async (email: string, authType: AuthType) => {

        const user = await User.findOne({
            where: {
                [Op.and]: [{email: email}, {auth_type: authType}]
            }
        })

        return user?.dataValues

    },

    getUserById: async (userId: string, attributes: Array<string> = []) => {

        const attributesCondition = attributes.length? {attributes: attributes}: {}

        const user = await User.findByPk(userId, {
            ...attributesCondition
        })
        return user?.dataValues

    },

    getUserByEmailWithAuthTypeAndRole: async (email: string, authType: AuthType, role: Role) => {

        const user = await User.findOne({
            where: {
                [Op.and]: [
                    {email: email},
                    {auth_type: authType},
                    {role: role}
                ]
            }
        })

        return user?.dataValues

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

        return newUser.dataValues

    },

    updateUserById: async (userId: string, updateFields: object): Promise<number> => {

        const [affectedCount] = await User.update(updateFields, {
            where: {
                id: {
                    [Op.eq]: userId
                }
            }
        })

        return affectedCount

    },

    deleteUser: async (userId: string): Promise<number> => {

        const affectedCount = await User.destroy({
            where: {
                id: {
                    [Op.eq]: userId
                }
            }
        })

        return affectedCount

    },

}