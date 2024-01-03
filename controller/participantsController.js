import Sevice from '../service/participantService.js'
import message from '../messages/message.js'
import httpcodes from '../codes/httpcodes.js'
import Response from '../response/response.js'

class Controller {
    async eventparticipantController(req, res, next) {
        try {

            const result = await Sevice.participantService(req.body)

            if (!result.sucess) {
                return Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, result.message)
            }

            return Response.sucess(req, res, httpcodes.HTTP_OK, result.data, result.message)

        }
        catch (err) {
            next(err)
        }
    }
    async getspecficbookedeventsController(req, res, next) {
        try {

            const result = await Sevice.getspecficbookedeventsService(req.body)

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