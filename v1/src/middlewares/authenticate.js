const httpStatus = require('http-status')
const JWT = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')?.[1]
    if (!token) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'You must log in to perform this operation.' })

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).send({ error: err.message })
        req.user = user._doc
        next()
    })
}

module.exports = authenticateToken
