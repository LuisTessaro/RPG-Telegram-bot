const register = require('./registerFunctions/registerFunction')

const menus = require('../../../menus/menus')

module.exports.registerRoute = (bot) => {
    bot.command('classes', (ctx) => {
        ctx.reply('Pick a class using the popup menu:', menus.classMenu)
    })

    bot.command('register', register)
}