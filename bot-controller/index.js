const helper = require('./helper')
const register = require('./register')
const player = require('./player')
const pet = require('./pet')
const gameplay = require('./gameplay')

const authMiddleware = require('../middlewares/auth-middleware')

// const signToken = require('../util/sign-jwt')

const { mainMenu } = require('../models/menus')

module.exports = (bot) => {
    bot.catch((errMessage, ctx) => {
        console.log('[ERROR]', errMessage)
        ctx.reply('An unexpected error has ocurred, please try again later')
    })

    // bot.use(responseTimeMiddleware)

    //non registered routes
    helper(bot)
    register(bot)

    //registered routes

    bot.use(authMiddleware)

    bot.command(['start', 'back'], (ctx) => ctx.reply('Main menu:', mainMenu))

    bot.command(['market', 'adventurers_guild', 'reborn'], (ctx) => ctx.reply('Not Implemented Yet 😢', mainMenu))

    player(bot)
    pet(bot)

    gameplay(bot)

    // bot.command('site_login', ctx => {
    //     ctx.reply(signToken(ctx.session.userInfo))
    // })
}