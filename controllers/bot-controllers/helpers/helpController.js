const Player = require('../../../model/mongoose-models/Player')

module.exports.helpRoute = (bot) => {
    bot.help((ctx) => ctx.reply('link to wiki [dont have a link yet]'))
    bot.start((ctx) => ctx.reply('/register to create a character'))

    bot.command('getplayers', async (ctx) => {
        const players = await Player.find()
        ctx.reply(players.map(p => p.username))
    })
}