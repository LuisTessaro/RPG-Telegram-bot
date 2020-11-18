const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PetSchema = new Schema({
  name: String,
  id: Number,
  level: Number,
  exp: Number,
})

module.exports = {
  PetSchema
}