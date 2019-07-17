const registerController = require('./bot-controllers/register/registerController')
const helperFunctions = require('./bot-controllers/helpers/helpController')
const playerController = require('./bot-controllers/player/playerController')
const gameplayController = require('./bot-controllers/gameplay/gameplayController')

const authMiddleware = require('../middlewares/authMiddleware')
const responseTimeMiddleware = require('../middlewares/responseTimeMiddleware')

module.exports = (bot) => {
    bot.use(responseTimeMiddleware)

    bot.command('sessh', ctx => {
        ctx.reply(Object.keys(ctx.session))
    })

    // non registered routes
    helperFunctions.helpRoute(bot)
    registerController.registerRoute(bot)

    bot.use(authMiddleware)

    //registered routes
    playerController.playerControllerRoute(bot)
    gameplayController.gameplayRoute(bot)
}