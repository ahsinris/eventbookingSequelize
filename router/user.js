import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/userController.js'
const router = express.Router()

router.post('/addUser', Validation.addUserValidation, Controller.adduserController)
router.get('/getuserEvents', Validation.geteventValidation, Controller.getuserController)
router.delete('/canceluserEvent', Validation.canceleventValidation, Controller.cancelEventController)


export default router