import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { User } from "./user.schema.js";

// Schema for rating
export const Ratings = sequelize.define("rating", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false,
    },
    movie_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING(350),
        defaultValue: ""
    },
    
}, {
    indexes: [
        {
            fields: ["user_id"]
        },
        {
            fields: ["movie_id"]
        }
    ]
})