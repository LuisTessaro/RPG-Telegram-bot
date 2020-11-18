const { grindSpots } = require('../../models/menus')
const grind = require('./grind')
const adventure = require('./adventure')

module.exports = (bot) => {
  bot.command('pet_expedition', ctx => ctx.reply('Pick a grind spot', grindSpots))

  bot.command('grind', grind)

  adventure(bot)
}
