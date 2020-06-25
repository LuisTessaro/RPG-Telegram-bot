const { grindSpots } = require('../../../menus/menus')

const { startGrind } = require('./grind/grindFunctions')

module.exports.gameplayRoute = (bot) => {
    bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', grindSpots))

    bot.command('grind', startGrind)
}
