const mongoose = require('mongoose')
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

module.exports = { AttributesSchema }