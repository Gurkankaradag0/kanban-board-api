const Mongoose = require('mongoose')

const SessionSchema = new Mongoose.Schema(
    {
        title: String,
        color: String,
        user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user'
        },
        tasks: [
            {
                task: String
            }
        ]
    },
    { versionKey: false, timestamps: true }
)

module.exports = Mongoose.model('session', SessionSchema)
