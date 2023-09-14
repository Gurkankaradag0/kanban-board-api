const Session = require('../models/Sessions')

const insert = (data) => {
    const instance = new Session(data)
    return instance.save()
}

const findOne = (id) => {
    return Session.findById(id)
}

const list = (where) => {
    return Session.find(where || {})
}

const modify = (data, id) => {
    return Session.findByIdAndUpdate(id, data, { new: true })
}

const del = (id) => {
    return Session.findByIdAndDelete(id)
}

module.exports = {
    insert,
    findOne,
    list,
    modify,
    del
}
