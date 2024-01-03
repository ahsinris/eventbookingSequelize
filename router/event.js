import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/eventController.js'
const router = express.Router()

router.post('/addEvent', Validation.addEventValidation, Controller.addeventController)
router.get('/onGoingEvents', Controller.ongoingeventController)

export default router