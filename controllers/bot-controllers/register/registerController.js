const register = require('./registerFunction')

const { classMenu } = require('../../../menus/menus')

module.exports.registerRoute = (bot) => {
    bot.command('classes', (ctx) => {
        ctx.reply('Pick a class using the popup menu:', classMenu)
    })

    bot.command('register', register)
}