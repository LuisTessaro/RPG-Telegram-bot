const Telegraf = require('telegraf')
const session = require('telegraf/session')

module.exports.setUpBot = (token) => {
    const telegrafInstance = new Telegraf(token)
    telegrafInstance.use(session())
    require('../controllers/botIndex')(telegrafInstance)
    return telegrafInstance
}