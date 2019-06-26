const registerController = require('./bot-controllers/register/registerController')
const helperFunctions = require('./bot-controllers/helpers/helpController')
const playerController = require('./bot-controllers/player/playerController')
const gameplayController = require('./bot-controllers/gameplay/gameplayController')

const authMiddleware = require('../middlewares/handleAuth')

module.exports = (bot) => {
    registerController.registerRoute(bot)
    bot.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log('Response time %sms', ms)
    })

    helperFunctions.helpRoute(bot)

    bot.use(authMiddleware)
    playerController.playerControllerRoute(bot)
    gameplayController.gameplayRoute(bot)
}