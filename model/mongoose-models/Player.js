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
    maxResource: {
        type: Number,
        default: 100,
    },
    resource: {
        type: Number,
        default: 100,
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
        default: 0
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
