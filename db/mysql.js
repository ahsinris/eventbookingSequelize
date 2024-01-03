import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
})

export default sequelize