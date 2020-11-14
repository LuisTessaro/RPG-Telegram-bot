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

const BagItemSchema = new Schema({
    name: String,
    amount: Number,
    modifier: String,
})

const GrindingSchema = new Schema({
    isGrinding: {
        type: Boolean,
        default: false,
    },
    map: {
        name: String,
        grindTime: Number,
        minimumRequiredLevel: Number,
        odds: Number,
        possibleExp: Number,
        possibleRewards: [String],
        trash: [String],

    },
    lastGrindStarted: {
        type: Date,
        default: Date.now(),
    },
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
        type: [BagItemSchema],
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
    grindingObj: {
        type: GrindingSchema,
        default: {
            isGrinding: false,
            map: {
                name: '',
                grindTime: 0,
                minimumRequiredLevel: 0,
                odds: 0,
                possibleExp: 0,
                possibleRewards: [],
                trash: [],
            },
            lastGrindStarted: Date.now(),
        }
    },
})
