const { grindSpots, mainMenu } = require('../../menus')
const grind = require('./grind')
// const { adventure, cast } = require('./adventure')

module.exports = (bot) => {
  bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', grindSpots))

  bot.command('grind', grind)

  // bot.command('adventure', adventure)
  // bot.command('cast', cast)
}
