import express from "express";
import dotenv from 'dotenv'
import sequelize from "./db/mysql.js";

/**router */
import UserRouter from "./router/user.js"
import EventRouter from "./router/event.js"
import ParticipantRouter from "./router/participants.js"


dotenv.config()
const app = express()
app.use(express.json())

app.use(UserRouter)
app.use(EventRouter)
app.use(ParticipantRouter)

sequelize.sync()
sequelize.authenticate()
    .then(() => {
        console.log(`connection established sucessfully`)
    })
    .catch((err) => {
        console.log("error", err)
    })
app.listen(process.env.PORT, () => {
    console.log(`port listned at ${process.env.PORT}`)
})