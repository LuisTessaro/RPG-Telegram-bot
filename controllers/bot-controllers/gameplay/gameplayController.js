const menu = require('./backMenu')
const adventureMiddleware = require('../../../middlewares/adventureMiddleware')
const needsActionMiddleware = require('../../../middlewares/needsActionMiddleware')
const exploreFunctions = require('./explore/exploreFunctions')

module.exports.gameplayRoute = (bot) => {
    bot.command(['back', 'start'], menu)

    bot.command('adventures', exploreFunctions.adventures)

    bot.command('expwlore', exploreFunctions.explore)

    // bot.use(adventureMiddleware)

    // bot.use(needsActionMiddleware)

    // bot.command(['inspect', 'fight', 'bargain', 'sneak', 'colect', 'flee'], exploreFunctions.action)
}
