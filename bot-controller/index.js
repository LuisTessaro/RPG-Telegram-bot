const helper = require('./helper')
const register = require('./register')
const player = require('./player')
const pet = require('./pet')
const gameplay = require('./gameplay')

const authMiddleware = require('../middlewares/auth-middleware')

const responseTimeMiddleware = require('../middlewares/response-time-middleware')

const { mainMenu } = require('../models/menus')

module.exports = (bot) => {
    bot.catch((errMessage, ctx) => {
        ctx.reply(errMessage)
    })

    bot.use(responseTimeMiddleware)

    // non registered routes
    helper(bot)
    register(bot)

    bot.use(authMiddleware)

    bot.command(['start', 'back'], (ctx) => ctx.reply('Main menu:', mainMenu))

    bot.command('sessh', ctx => {
        ctx.reply(JSON.stringify(ctx.session))
    })

    //registered routes
    player(bot)
    pet(bot)
    gameplay(bot)
}