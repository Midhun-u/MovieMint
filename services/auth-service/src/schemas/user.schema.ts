import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequlize.js";

//Schema for user
export const User = sequelize.define("User", {

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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false
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

})