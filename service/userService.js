import user from "../models/user.js"
import eventParticpants from "../models/event_participants.js";
import httpcodes from "../codes/httpcodes.js";
import message from "../messages/message.js";
import events from "../models/events.js";

class Sevice {
    async adduserService(reqdata) {

        const name = reqdata

        const result = await user.create(name)
        return {
            sucess: true,
            status: httpcodes.HTTP_OK,
            message: message[200],
            data: result
        }

    }
    async getuserService(reqdata) {
        try {
            const { user_id } = reqdata

            const isuserexist = await user.findAll({ where: { user_id } })

            if (isuserexist.length == 0) {
                return {
                    sucess: false,
                    status: httpcodes.HTTP_BAD_REQUEST,
                    message: message[104]
                }
            }
            const result = await eventParticpants.findAll({
                where: {
                    user_id: user_id
                },
                include: events,
            })


            if (!result.length) {
                return {
                    sucess: false,
                    status: 400,
                    message: "error fetching in users events"
                }
            }
            const pastEvents = []
            const presentEvents = []
            const futureEvents = []
            result.forEach((item) => {
                const events = item.event
                let eventStartTime = new Date(events.start_time)
                let eventendTime = new Date(events.end_time)

                let curretdate = new Date()

                if (eventendTime < curretdate) {
                    pastEvents.push(events)
                }
                else if (eventStartTime <= curretdate && eventendTime >= curretdate) {
                    presentEvents.push(events)
                }
                else {
                    futureEvents.push(events)
                }

            })
            const allEvents = [...pastEvents, ...presentEvents, ...futureEvents].sort(
                (a, b) => new Date(b.start_time) - new Date(a.start_time)
            )
            return {
                sucess: true,
                status: 200,
                data: allEvents
            }
        }
        catch (e) {
            console.log(e)
        }


    }

    async cancelEventServive(reqdata) {
        const { user_id, event_id } = reqdata

        const isuserexist = await user.findAll({ where: { user_id } })

        if (isuserexist.length == 0) {
            return {
                sucess: false,
                status: 400,
                message: "user not found"
            }
        }
        const isEventBooked = await eventParticpants.findAll(
            {
                where: {
                    event_id: event_id,
                    user_id: user_id
                }
            }
        )
        if (isEventBooked.length == 0) {
            return {
                sucess: false,
                status: 400,
                message: "this user has not booked this event"
            }
        }
        const result = await events.findAll({ where: { event_id } })

        let eventStartTime = new Date(result[0].dataValues.start_time)

        let currettime = new Date()

        let timeDifference = eventStartTime - currettime

        let eighthoursinMillsec = 8 * 60 * 60 * 1000

        if (timeDifference < eighthoursinMillsec) {
            return {
                sucess: false,
                status: 400,
                message: "event can't be canceled less than 8 hours before event start time"
            }
        }

        await eventParticpants.destroy({
            where: {
                event_id: event_id,
                user_id: user_id,
            },
        })
        return {
            sucess: true,
            message: "event canceled sucessfully"
        }

    }
}

export default new Sevice()