const Player = require('../../models/mongoose-models/Player')

module.exports = (bot) => {
    bot.help((ctx) => ctx.reply('link to wiki [no wiki yet]'))
    bot.start((ctx) => ctx.reply('/register to create a character'))

    bot.command('getplayers', async (ctx) => {
        const players = await Player.find()
        ctx.reply(players.map(p => p.username))
    })
}