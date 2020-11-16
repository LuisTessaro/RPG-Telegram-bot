const mongoose = require('mongoose')
const PetSchema = require('./PetSchema')

const Schema = mongoose.Schema

const AttributesSchema = new Schema({
    str: { type: Number, default: 0 },
    dex: { type: Number, default: 0 },
    agi: { type: Number, default: 0 },
    con: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    wis: { type: Number, default: 0 },
    wil: { type: Number, default: 0 },
    luk: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
})

const BagItemSchema = new Schema({
    name: String,
    amount: Number,
    modifier: String,
    type: String,
})

const GrindingSchema = new Schema({
    rewardsCollected: {
        type: Boolean,
        default: true,
    },
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
        commonRewards: [String],

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
    specId: {
        type: Number,
        default: 0,
    },
    classId: {
        type: Number,
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
            rewardsCollected: true,
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
    has_registered_pet: {
        type: Boolean,
        default: false,
    },
    pet: {
        type: PetSchema,
        default: {
            name: '',
            id: 0,
            level: 1,
            exp: 0,
        },
    }
})
