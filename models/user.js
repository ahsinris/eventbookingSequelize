import sequelize from "../db/mysql.js";
import { DataTypes } from 'sequelize'

const user = sequelize.define('users', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

}, {
    timestamps: false
})

export default user