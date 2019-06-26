const mongoose = require('mongoose')

module.exports = mongoose.model('AdventureProgress', {
    telegramId: {
        type: Number,
        required: true,
    },
    map: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    }
})
