const User = require('../models/Users')

const findOne = (id) => {
    return User.findById(id)
}

const insert = (data) => {
    const instance = new User(data)
    return instance.save()
}

const loginUser = (data) => {
    return User.findOne(data)
}

const del = (id) => {
    return User.findByIdAndDelete(id)
}

module.exports = {
    findOne,
    insert,
    loginUser,
    del
}
