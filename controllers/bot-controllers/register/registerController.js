const classMenu = require('./registerFunctions/classesMenuFunction')
const register = require('./registerFunctions/registerFunction')

module.exports.registerRoute = (bot) => {
    bot.command('classes', classMenu)
    bot.command('register', register)
}