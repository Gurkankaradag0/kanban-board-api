const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('./config')()
require('./loaders')()
const { UserRoutes, SessionRoutes } = require('./api-routes')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(
    cors({
        origin: '*',
        methods: 'GET,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
)

app.listen(process.env.APP_PORT, () => {
    console.log(`The server is running on port ${process.env.APP_PORT}...`)
    app.use('/users', UserRoutes)
    app.use('/sessions', SessionRoutes)
})
