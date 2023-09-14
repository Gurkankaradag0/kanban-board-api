const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema(
    {
        full_name: String,
        password: String,
        email: {
            type: String,
            unique: true
        }
    },
    { versionKey: false, timestamps: true }
)

module.exports = Mongoose.model('user', UserSchema)
