const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = new Schema({
  name: String,
  id: Number,
  level: Number,
  exp: Number,
})