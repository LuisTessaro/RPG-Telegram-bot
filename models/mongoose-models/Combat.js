const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CombatSchema = new Schema({
  participants: Array,
  playerObjects: Array,
  monsterObjects: Array,
  areaBuffsPlayers: Array,
  areaBuffsMonsters: Array,
  areaDebuffsPlayers: Array,
  areaDebuffsMonsters: Array,
  playerTurn: String,
  monsterTurn: String,
})

module.exports = mongoose.model('Combat', CombatSchema)
