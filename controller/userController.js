import Sevice from '../service/userService.js'
import message from '../messages/message.js'
import httpcodes from '../codes/httpcodes.js'
import Response from '../response/response.js'

class Controller {
    async adduserController(req, res, next) {
        try {

            const result = await Sevice.adduserService(req.body)

            if (!result.sucess) {
                Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, message[100])
            }
            Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            next(err)
        }
    }
    async getuserController(req, res, next) {
        try {

            const result = await Sevice.getuserService(req.body)

            if (!result.sucess) {
                Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, result.message)
            }
            Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            next(err)
        }
    }
    async cancelEventController(req, res, next) {
        try {

            const result = await Sevice.cancelEventServive(req.body)

            if (result.sucess) {
                Response.error(req, res, httpcodes.HTTP_BAD_REQUEST, null, result.message)
            }

            Response.sucess(req, res, result.status, result.data,result.message)


        }
        catch (err) {
            next(err)
        }
    }
}

export default new Controller()