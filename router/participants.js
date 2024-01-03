import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/participantsController.js'
const router = express.Router()

router.post('/joinEvent', Validation.joineventValidation, Controller.eventparticipantController)
router.get('/getspecficbookedevents', Validation.getspecficbookedevents, Controller.getspecficbookedeventsController)

export default router