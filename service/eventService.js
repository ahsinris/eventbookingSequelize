import { Op } from 'sequelize';

import events from '../models/events.js'
import user from '../models/user.js';
import httpcodes from '../codes/httpcodes.js';
import message from '../messages/message.js';
import eventParticpants from '../models/event_participants.js';

class Sevice {
  async addeventService(reqdata) {

    const { event_name, start_time, end_time, price } = reqdata

    let data = {
      event_name: event_name,
      start_time: start_time,
      end_time: end_time,
      price: price,
    }

    const result = await events.create(data)
    return {
      sucess: true,
      status: httpcodes.HTTP_OK,
      message: message[201],
      data: result
    }

  }


  async onGoingEventService() {
    try {
      let currentTime = new Date()

      const result = await eventParticpants.findAll({
        attributes: [
          [user.sequelize.col('user_name'), 'participant_name'],
          [events.sequelize.col('event_name'), 'event_name'],
        ],
        include: [
          {
            model: user,
            required: true,
          },
          {
            model: events,
            required: true,
            where: {
              start_time: {
                [Op.lte]: currentTime,
              },
              end_time: {
                [Op.gte]: currentTime,
              },

            },
          },
        ],

      })
      return {
        sucess: true,
        status: httpcodes.HTTP_OK,
        message: message[204],
        data: result
      }


    }
    catch (e) {
      console.log(e)
    }
  }
}

export default new Sevice()
