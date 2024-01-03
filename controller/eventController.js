import Sevice from '../service/eventService.js'
import message from '../messages/message.js'
import httpcodes from '../codes/httpcodes.js'
import Response from '../response/response.js'

class Controller {
    async addeventController(req, res, next) {
        try {

            const result = await Sevice.addeventService(req.body)

            if (!result.sucess) {
                Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[100])
            }
            Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            next(err)
        }
    }
    async ongoingeventController(req, res, next) {
        try {

            const result = await Sevice.onGoingEventService(req.body)

            if (!result.sucess) {
                Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[100])
            }
            Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            next(err)
        }
    }

    
}

export default new Controller()