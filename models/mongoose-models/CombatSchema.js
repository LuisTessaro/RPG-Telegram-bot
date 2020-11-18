const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  playerObjects: Object,
  monsterObjects: Object,
  areaBuffsPlayers: Array,
  areaBuffsMonsters: Array,
  areaDebuffsPlayers: Array,
  areaDebuffsMonsters: Array,
  monsterTurn: Boolean,
  playerTurn: String,
})