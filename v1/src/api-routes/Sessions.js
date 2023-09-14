const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')
const paramValidate = require('../middlewares/paramValidate')
const schemas = require('../validations/Sessions')
const express = require('express')
const { create, update, remove, addTask, moveTask, updateTask, delTask } = require('../controllers/Sessions')
const router = express.Router()

router.route('/').post(authenticate, validate(schemas.createValidation), create)
router.route('/:id').patch(authenticate, paramValidate('id'), validate(schemas.updateValidation), update)
router.route('/:id').delete(authenticate, paramValidate('id'), remove)

router.route('/:id/add-task').post(authenticate, paramValidate('id'), validate(schemas.createTaskValidation), addTask)
router.route('/:id/:taskId/move-task').post(authenticate, paramValidate('id'), validate(schemas.moveTaskValidation), moveTask)
router.route('/:id/:taskId').patch(authenticate, paramValidate('id'), paramValidate('taskId'), updateTask)
router.route('/:id/:taskId').delete(authenticate, paramValidate('id'), paramValidate('taskId'), delTask)

module.exports = router
