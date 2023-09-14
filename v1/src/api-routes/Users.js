const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')
const schemas = require('../validations/Users')
const express = require('express')
const { verify, login, create, sessionList, remove } = require('../controllers/Users')
const router = express.Router()

router.route('/').get(authenticate, verify)
router.route('/').post(validate(schemas.createValidation), create)
router.route('/login').post(validate(schemas.loginValidation), login)
router.route('/sessions').get(authenticate, sessionList)
router.route('/delete').delete(authenticate, remove)

module.exports = router
