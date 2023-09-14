const { findOne, insert, loginUser, del } = require('../services/Users')
const httpStatus = require('http-status')
const SessionService = require('../services/Sessions')
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')

const verify = (req, res) => {
    findOne(req.user._id)
        .then((user) => {
            if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })
            res.status(httpStatus.OK).send(user)
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const create = (req, res) => {
    insert({ ...req.body, password: passwordToHash(req.body.password) })
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const login = (req, res) => {
    loginUser({ ...req.body, password: passwordToHash(req.body.password) })
        .then((user) => {
            if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })

            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            }

            delete user.password
            res.status(httpStatus.OK).send(user)
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const sessionList = (req, res) => {
    SessionService.list({ user_id: req.user._id })
        .then((boards) => res.status(httpStatus.OK).send(boards))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

const remove = (req, res) => {
    del(req.user._id)
        .then((deletedItem) => {
            if (!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'There is no such record.' })
            res.status(httpStatus.OK).send({ message: 'Kayıt silinmiştir.' })
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'An error occurred.' }))
}

module.exports = {
    verify,
    login,
    create,
    sessionList,
    remove
}
