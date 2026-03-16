import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

// Theater schema
export const Theater = sequelize.define("theater", {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    owner_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: "theaters_owner_id_key",
    },
    theater_name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    theater_location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    formats: {
        type: DataTypes.ARRAY(DataTypes.STRING(30)),
        allowNull: false,
    },
    layout_number: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 3,
        },
        allowNull: false,
    },
    sets_number: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 4
        },
        allowNull: false
    },
    rows_number: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    },
    seats_number: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 7
        },
        allowNull: false
    },
    allow_cancellation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM("PENDING", "AVAILABLE", "NOT_AVAILABLE"),
        allowNull: false,
        defaultValue: "PENDING"
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ["owner_id"]
        }
    ]
})