const { insert, findOne, modify, del } = require('../services/Sessions')
const httpStatus = require('http-status')

const create = (req, res) => {
    insert({ ...req.body, user_id: req.user })
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const update = (req, res) => {
    modify(req.body, req.params.id)
        .then((updatedItem) => {
            if (!updatedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })
            res.status(httpStatus.OK).send(updatedItem)
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const remove = (req, res) => {
    del(req.params.id)
        .then((deletedItem) => {
            if (!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })
            res.status(httpStatus.OK).send({ message: 'Kayıt silinmiştir.' })
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const addTask = (req, res) => {
    findOne(req.params.id)
        .then((session) => {
            if (!session) return res.status(httpStatus.BAD_REQUEST).send({ message: 'There is no such record.' })
            session.tasks.push(req.body)
            session
                .save()
                .then((updatedSession) => res.status(httpStatus.OK).send(updatedSession))
                .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const moveTask = (req, res) => {
    findOne(req.params.id)
        .then((session) => {
            if (!session) return res.status(httpStatus.BAD_REQUEST).send({ message: 'There is no such record.' })
            const task = session.tasks.find((task) => task._id.toString() === req.params.taskId)
            session.tasks = session.tasks.filter((task) => task._id.toString() !== req.params.taskId)
            session
                .save()
                .then(() => {
                    findOne(req.body.session_id)
                        .then((newSession) => {
                            if (!newSession) return res.status(httpStatus.BAD_REQUEST).send({ message: 'There is no such record.' })
                            newSession.tasks.push({
                                task: task.task,
                                order: req.body.order
                            })
                            newSession
                                .save()
                                .then(() => res.status(httpStatus.OK).send({ message: 'The operation was successful.' }))
                                .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
                        })
                        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
                })
                .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const updateTask = (req, res) => {
    findOne(req.params.id)
        .then((session) => {
            if (!session) return res.status(httpStatus.BAD_REQUEST).send({ message: 'There is no such record.' })
            session.tasks = session.tasks.map((task) => {
                if (task._id.toString() === req.params.taskId) {
                    task = {
                        ...task,
                        ...req.body
                    }
                }
                return task
            })
            session
                .save()
                .then((updatedSession) => res.status(httpStatus.OK).send(updatedSession))
                .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const delTask = (req, res) => {
    findOne(req.params.id)
        .then((session) => {
            if (!session) return res.status(httpStatus.BAD_REQUEST).send({ message: 'There is no such record.' })
            session.tasks = session.tasks.filter((task) => task._id.toString() !== req.params.taskId)
            session
                .save()
                .then((updatedSession) => res.status(httpStatus.OK).send(updatedSession))
                .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

module.exports = {
    create,
    update,
    remove,
    addTask,
    moveTask,
    updateTask,
    delTask
}
