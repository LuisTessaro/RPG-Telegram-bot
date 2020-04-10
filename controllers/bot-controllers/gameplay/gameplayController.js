const adventureMiddleware = require('../../../middlewares/adventureMiddleware')
const needsActionMiddleware = require('../../../middlewares/needsActionMiddleware')
// const exploreFunctions = require('./explore/exploreFunctions')
const grindFunctions = require('./grind/grindFunctions')
const menus = require('../../../menus/menus')

module.exports.gameplayRoute = (bot) => {
    //menu routes
    // bot.command('adventures', ctx => ctx.reply('Pick an adventure from the ones below:', menus.adventuresMenu))
    bot.command('grindSpots', ctx => ctx.reply('Pick a grind spot', menus.grindSpots))

    //start gameplay routes
    // bot.command('explore', exploreFunctions.explore)
    bot.command('grind', grindFunctions.grind)

    //in game routes
    // bot.use(adventureMiddleware)
    // bot.use(needsActionMiddleware)
    // bot.command('adventureMenu', ctx => ctx.reply('Pick your action', menus.actionsMenu))

    // bot.command(['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'], exploreFunctions.action)
}
