const registerController = require('./register/registerController')
const helperFunctions = require('./helpers/helpController')
const playerController = require('./player/playerController')
const gameplayController = require('./gameplay/gameplayController')

const Composer = require('telegraf/composer');

const authMiddleware = require('../../middlewares/authMiddleware')
const responseTimeMiddleware = require('../../middlewares/responseTimeMiddleware')

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