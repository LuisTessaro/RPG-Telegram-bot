const grindFunctions = require('./grind/grindFunctions')
const menus = require('../../../menus/menus')

module.exports.gameplayRoute = (bot) => {
    bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', menus.grindSpots))

    bot.command('grind', grindFunctions.grind)
}
