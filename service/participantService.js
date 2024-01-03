import eventParticpants from '../models/event_participants.js'
import events from '../models/events.js';
import generateTransactionId from '../middleware/transactionId.js';
import payment_details from '../models/payment_details.js';
import httpcodes from "../codes/httpcodes.js";
import message from "../messages/message.js";
import { Op } from 'sequelize';
import user from '../models/user.js';
import Csv from '../middleware/csvreportgenrator.js'

class Service {

    async participantService(reqdata) {

        const { event_id, user_id, mop } = reqdata
        const userDetails = await user.findAll({ where: { user_id: user_id } })
        // console.log(userDetails[0].dataValues.user_name)


        const eventcheck = await events.findAll({ where: { event_id: event_id } })
        // console.log(eventcheck[0].dataValues.event_name)
        if (!eventcheck) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[103]
            }
        }

        const userBookedEvent = await eventParticpants.findAll({
            where: {
                event_id: event_id,
                user_id: user_id
            }
        })

        if (userBookedEvent.length > 0) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[101]
            }
        }
        const eventtimes = await events.findAll({
            where: { event_id: event_id }
        })

        const now = new Date()

        const startTime = new Date(eventtimes[0].dataValues.start_time)

        const endTime = new Date(eventtimes[0].dataValues.end_time)

        const overlap = await eventParticpants.findAll({
            attributes: ['join_status'],
            include: {
                model: events,
                required: true,
                where: {
                    [Op.or]: [
                        {
                            start_time: {
                                [Op.between]: [startTime, endTime]
                            },
                        },
                        {
                            end_time: {
                                [Op.between]: [startTime, endTime]
                            },
                        },
                    ],
                },
            },
            where: {
                user_id: user_id
            }
        })


        if (overlap.length > 0) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[102]
            }
        }
        let Transaction_id = generateTransactionId()

        if (mop === 'CreditCard') {
            Transaction_id = 'CC' + Transaction_id
        }
        if (mop === 'DebitCard') {
            Transaction_id = 'DB' + Transaction_id
        }
        if (mop === 'Netbanking') {
            Transaction_id = 'NB' + Transaction_id
        } if (mop === 'Upi') { Transaction_id = 'UPI' + Transaction_id }


        let payment_data = {
            mop: mop,
            Transaction_id: Transaction_id,
            payment_status: "sucess"
        }

        const payment = await payment_details.create(payment_data)


        let eventDetails = {
            event_id: event_id,
            user_id: user_id,
            join_status: 'joined',
            payment_id: payment.dataValues.payment_id

        }
        const insert = await eventParticpants.create(eventDetails)

        // console.log("insert", insert.dataValues.Booking_date)


        const paymentDetails = await payment_details.findAll({ where: { payment_id: payment.dataValues.payment_id } })

        // console.log(paymentDetails[0].dataValues.mop)

        let finalData = {
            bookingID: insert.dataValues.id,
            "user ID": user_id,
            userName: userDetails[0].dataValues.user_name,
            eventID: event_id,
            eventName: eventcheck[0].dataValues.event_name,
            startTime: eventcheck[0].dataValues.start_time,
            endTime: eventcheck[0].dataValues.end_time,
            price: eventcheck[0].dataValues.price,
            paymentID: payment.dataValues.payment_id,
            mop: paymentDetails[0].dataValues.mop,
            TransactionID: paymentDetails[0].dataValues.Transaction_id,
            paymentStatus: paymentDetails[0].dataValues.payment_status
        }

        let csvData = Csv.csvdata(finalData)
        let csvReport = Csv.csvreportGenerator(csvData)
        // console.log(csvReport)





        return {
            sucess: true,
            status: httpcodes.HTTP_OK,
            message: message[203],
            data: finalData
        }


    }

    async getspecficbookedeventsService(reqdata) {
        try {
            let { start_date, end_date } = reqdata

            const result = await eventParticpants.findAll({
                where: {
                    Booking_date: {
                        [Op.between]: [start_date, end_date]
                    }
                },
                include: events
            })
            const useridarray = []
            const eventidarray = []
            const paymentidarray = []
            const bookingidarray = []
            result.forEach(col => {
                useridarray.push(col.dataValues.user_id)
                eventidarray.push(col.dataValues.event_id)
                paymentidarray.push(col.dataValues.payment_id)
                bookingidarray.push(col.dataValues.id)

            })



            const userDetails = await user.findAll({
                where: {
                    user_id: {
                        [Op.in]: useridarray
                    }
                }
            })

            const eventDetails = await events.findAll({
                where: {
                    event_id: {
                        [Op.in]: eventidarray
                    }

                }
            })

            const paymentDetails = await payment_details.findAll({
                where: {
                    payment_id: {
                        [Op.in]: paymentidarray
                    }
                }
            })
            // console.log(paymentDetails)



            let finalData = {
                bookingID: result.forEach(col => {
                    col.dataValues.id
                }),
                userID: result.forEach(col => {
                    col.dataValues.user_id
                }),
                userName: userDetails.forEach(user => {
                    user.dataValues.user_name
                }),
                eventID: result.forEach(col => {
                    col.dataValues.event_id
                }),
                eventName: eventDetails.forEach(event => {
                    event.dataValues.event_name
                }),
                startTime: eventDetails.forEach(event => {
                    event.dataValues.start_time
                }),
                endTime: eventDetails.forEach(event => {
                    event.dataValues.end_time
                }),
                price: eventDetails.forEach(event => {
                    event.dataValues.price
                }),
                paymentID: result.forEach(col => {
                    col.dataValues.payment_id
                }),
                mop: paymentDetails.forEach(price => {
                    price.dataValues.mop
                }),
                TransactionID: paymentDetails.forEach(price => {
                    price.dataValues.Transaction_id
                }),
                paymentStatus: paymentDetails.forEach(price => {
                    price.dataValues.payment_status
                }),
            }

            console.log(finalData)

            let csvData = Csv.csvdata(finalData)
            let csvReport = Csv.csvreportGenerator(csvData)



            return {
                sucess: true,
                status: httpcodes.HTTP_OK,
                message: message[205],
                data: result
            }


        }
        catch (e) {
            console.log(e)
        }
    }

}



export default new Service()