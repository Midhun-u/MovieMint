import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

//Schema for user
export const User = sequelize.define("user", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(10),
    },
    email: {
        type: DataTypes.STRING(),
        unique: "users_email_key",
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    auth_type: {
        type: DataTypes.ENUM("EMAIL", "GOOGLE"),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("USER", "ADMIN", "THEATER_OWNER"),
        allowNull: false
    },

}, {
    indexes: [
        {
            fields: ["email"]
        }
    ]
})