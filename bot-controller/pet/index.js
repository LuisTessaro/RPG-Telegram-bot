const pet = require('./pet')
const petInfo = require('./pet-info.js')
const registerPet = require('./register-pet')
const editPet = require('./edit-pet')

module.exports = (bot) => {
  bot.command('pet', pet)

  bot.command('pet_info', petInfo)

  bot.command('change_pet_name', editPet)

  bot.action(/register_pet (.*?)/, registerPet)
}