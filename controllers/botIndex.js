const registerController = require('./bot-controllers/register/registerController')
const helperFunctions = require('./bot-controllers/helpers/helpController')
const playerController = require('./bot-controllers/player/playerController')
const gameplayController = require('./bot-controllers/gameplay/gameplayController')

const authMiddleware = require('../middlewares/authMiddleware')
const responseTimeMiddleware = require('../middlewares/responseTimeMiddleware')

module.exports = (bot) => {
    bot.use(responseTimeMiddleware)

    helperFunctions.helpRoute(bot)
    registerController.registerRoute(bot)

    bot.use(authMiddleware)

    bot.command('resetSession', async (ctx) => {
        ctx.session = undefined
    })

    playerController.playerControllerRoute(bot)
    // gameplayController.gameplayRoute(bot)
}