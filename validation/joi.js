import joi from 'joi'

class Validation {

    /**adduservalidation */

    async addUserValidation(req, res, next) {
        try {
            const schema = joi.object({
                user_name: joi.string().required(),
           

            })

            schema.validateAsync(req.body)

            next()
        }
        catch (err) {
            next(err)
        }


    }

    async addEventValidation(req, res, next) {

        console.log("ris")
        try {
            const schema = joi.object({
                event_name: joi.string().required(),
                start_time: joi.date().iso().required(),
                end_time: joi.date().greater(joi.ref('start_time')).required(),
                price: joi.number().required()

            })
            await schema.validateAsync(req.body)
            next()


        }
        catch (err) {
            next(err)
        }
    }

    async joineventValidation(req, res, next) {
        try {
            let schema = joi.object({
                event_id: joi.number().required(),
                user_id: joi.number().required(),
                mop: joi.string().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (err) {
            next(err)
        }
    }

    async geteventValidation(req, res, next) {
        try {
            let schema = joi.object({
                user_id: joi.number().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (err) {
            next(err)
        }
    }

    async canceleventValidation(req, res, next) {
        try {
            let schema = joi.object({
                user_id: joi.number().required(),
                event_id: joi.number().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (err) {
            next(err)
        }
    }
    async getspecficbookedevents(req, res, next) {
        try {
            let schema = joi.object({
                start_date: joi.date().required(),
                end_date: joi.date().required()
            })
            await schema.validateAsync(req.body)
            next()
        }
        catch (err) {
            next(err)
        }
    }


}






export default new Validation()