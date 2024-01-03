import sequelize from "../db/mysql.js";
import { DataTypes } from 'sequelize'
const events = sequelize.define('events', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true

    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: false
})
export default events