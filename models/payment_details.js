import sequelize from "../db/mysql.js";
import { DataTypes } from 'sequelize'

const payment_details = sequelize.define('payment_details', {
    payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    mop: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Transaction_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    }

}, {
    timestamps: false
})
export default payment_details
