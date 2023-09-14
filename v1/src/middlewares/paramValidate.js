const httpStatus = require('http-status')

const paramValidate = (param) => (req, res, next) => {
    if (!req.params?.[param]) return res.status(httpStatus.BAD_REQUEST).json({ error: `${param} not found` })
    return next()
}

module.exports = paramValidate
