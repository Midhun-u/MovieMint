import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Schema for image
export const UserImage = sequelize.define("userImage", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    image_path: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    image_size: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    image_type: {
        type: DataTypes.STRING,
        defaultValue: ""
    }
})