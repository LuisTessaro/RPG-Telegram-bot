const register = require('./register')
const registerInfo = require('./register-info')

module.exports = (bot) => {
    bot.command('register', registerInfo)

    bot.action(/register_player (.*?)/, register)
}
