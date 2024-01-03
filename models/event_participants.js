import sequelize from "../db/mysql.js";
import { DataTypes } from 'sequelize';
import Sequelize from "sequelize";
import user from "./user.js";
import events from "./events.js";
import payment_details from "./payment_details.js";

const eventParticpants = sequelize.define('event_participants', {
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true

        }

    },

    join_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    Booking_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,

    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false
})

eventParticpants.belongsTo(events, { foreignKey: 'event_id' })
eventParticpants.belongsTo(user, { foreignKey: 'user_id' })
eventParticpants.belongsTo(payment_details, { foreignKey: 'payment_id' })

events.hasMany(eventParticpants, { foreignKey: 'event_id' })
user.hasMany(eventParticpants, { foreignKey: 'user_id' })
payment_details.hasMany(eventParticpants, { foreignKey: 'payment_id' })

export default eventParticpants

