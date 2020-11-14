const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AttributesSchema = new Schema({
    str: { type: Number, default: 0 },
    dex: { type: Number, default: 0 },
    agi: { type: Number, default: 0 },
    con: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    wis: { type: Number, default: 0 },
    car: { type: Number, default: 0 },
    wil: { type: Number, default: 0 },
    luk: { type: Number, default: 0 },
})


module.exports = mongoose.model('Player', {
    firstName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    telegramId: {
        type: Number,
        required: true,
    },
    spec: {
        type: String,
        default: 'none',
    },
    className: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 0
    },
    attributes: {
        type: AttributesSchema
    },
    bag: {
        type: [String],
    },
    equipment: {
        head: {
            type: String,
            default: ''
        },
        legs: {
            type: String,
            default: ''
        },
        body: {
            type: String,
            default: ''
        },
        weapon: {
            type: String,
            default: ''
        },
        shield: {
            type: String,
            default: ''
        },
        trinket: {
            type: String,
            default: ''
        },
        ring: {
            type: String,
            default: ''
        },
    },
})
