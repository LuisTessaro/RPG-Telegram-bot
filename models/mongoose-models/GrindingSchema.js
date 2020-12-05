const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GrindingSchema = new Schema({
  rewardsCollected: Boolean,
  isGrinding: Boolean,
  map: {
    name: String,
    grindTime: Number,
    minimumRequiredLevel: Number,
    odds: Number,
    possibleExp: Number,
    possibleRewards: [String],
    trash: [[String]],
  },
  lastGrindStarted: Date,
})

module.exports = { GrindingSchema }