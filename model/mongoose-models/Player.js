const mongoose = require('mongoose')

module.exports = mongoose.model('Player', {
    firstName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    classe: {
        type: String,
    },
    level: {
        type: Number,
        default: 1
    },
    attributes: {
        type: Object,
    },
    telegramId: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    bag: {
        type: Array,
        default: []
    },
    inventory: {
        type: Object,
        default: {}
    },
})
