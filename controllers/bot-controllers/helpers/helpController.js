const Player = require('../../../model/mongoose-models/Player')

module.exports.helpRoute = (bot) => {
    bot.help((ctx) => ctx.reply('/register to register'))

    bot.command('getplayers', async (ctx) => {
        const players = await Player.find()
        ctx.reply(players)
    })
}