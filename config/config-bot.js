const Telegraf = require('telegraf')
const session = require('telegraf/session')

module.exports = (token) => {
    const telegrafInstance = new Telegraf(token)
    telegrafInstance.use(session())
    return telegrafInstance
}