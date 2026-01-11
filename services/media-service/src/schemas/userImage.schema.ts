import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Schema for image
export const UserImage = sequelize.define("user_image", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    image_url: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false
    },
    image_path: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_full_path: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_type: {
        type: DataTypes.ENUM({ values: ["image/jpg", "image/jpeg", "image/png", "image/webp"] }),
        allowNull: false,
    }
})