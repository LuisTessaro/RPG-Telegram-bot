const helper = require('./helper')
const register = require('./register')
const player = require('./player')
const gameplay = require('./gameplay')

const authMiddleware = require('../middlewares/auth-middleware')

const responseTimeMiddleware = require('../middlewares/response-time-middleware')

module.exports = (bot) => {
    bot.catch((errMessage, ctx) => {
        ctx.reply(errMessage)
    })

    bot.use(responseTimeMiddleware)

    // non registered routes
    helper(bot)
    register(bot)

    bot.use(authMiddleware)

    bot.command('sessh', ctx => {
        ctx.reply(JSON.stringify(ctx.session))
    })

    //registered routes
    player(bot)
    gameplay(bot)
}