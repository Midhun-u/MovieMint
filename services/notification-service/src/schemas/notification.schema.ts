import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

// Notification schema
export const Notification = sequelize.define("notification", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    success: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    type: {
        type: DataTypes.ENUM("movie", "payment"),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM("PENDING", "AVAILABLE"),
        defaultValue: "PENDING",
        allowNull: false
    }
}, {
    indexes: [
        {
            fields: ["user_id"],
        }
    ]
})