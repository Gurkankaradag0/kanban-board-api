const Mongoose = require('mongoose')

const db = Mongoose.connection

db.once('open', () => {
    console.log('DB Connection is successful...')
})

const connectDB = async () => {
    const HOST = process.env.DB_HOST
    const USER = process.env.DB_USER
    const PASS = process.env.DB_PASS
    const NAME = process.env.DB_NAME
    await Mongoose.connect(`mongodb+srv://${USER}:${PASS}@${HOST}/${NAME}`)
}

module.exports = {
    connectDB
}
