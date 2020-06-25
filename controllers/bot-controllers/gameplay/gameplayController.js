const { grindSpots } = require('../../../menus/menus')
const { startGrind } = require('./grind/grindFunctions')
const { adventure, cast } = require('./adventure')

module.exports.gameplayRoute = (bot) => {
    bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', grindSpots))

    bot.command('grind', startGrind)

    bot.command('adventure', adventure)
    bot.command('cast', cast)

    

}
