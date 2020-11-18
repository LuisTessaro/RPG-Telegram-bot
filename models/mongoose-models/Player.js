const mongoose = require('mongoose')
const { PetSchema } = require('./PetSchema')
const { AttributesSchema } = require('./AttributtesSchema')
const { GrindingSchema } = require('./GrindingSchema')

const Schema = mongoose.Schema

const BagItemSchema = new Schema({
    name: String,
    amount: Number,
    modifier: String,
    type: String,
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
