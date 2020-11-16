const pet = require('./pet')
const petInfo = require('./pet-info.js')
const registerPet = require('./register-pet')
const editPet = require('./edit-pet')
const collect = require('./colect-rewards')

module.exports = (bot) => {
  bot.command('pet', pet)

  bot.command('pet_info', petInfo)

  bot.command('change_pet_name', editPet)

  bot.command('collect', collect)

  bot.action(/register_pet (.*?)/, registerPet)
}