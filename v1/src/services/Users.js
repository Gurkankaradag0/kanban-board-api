const User = require('../models/Users')

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
    insert,
    loginUser,
    del
}
