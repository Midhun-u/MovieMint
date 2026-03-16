import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// Schema for theater image
export const TheaterImage = sequelize.define("theater_image", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    theater_id: {
        type: DataTypes.TEXT,
        unique: "theater_images_theater_id_key",
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
}, {
    indexes: [
        {
            unique: true,
            fields: ["theater_id"]
        }
    ]
})