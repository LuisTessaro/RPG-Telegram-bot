const Player = require('../model/mongoose-models/Player')

module.exports = async (ctx, next) => {
    const player = await Player.find({ telegramId: ctx.message.from.id })
    if (player && player.length > 0) {
        if (ctx.session.authed){
            ctx.session.player = player[0]
            return next()
        }
        else {
            ctx.session.authed = true
            ctx.session.player = player[0]
            console.log('[INFO]', ctx.session.player.username, 'was authed to session...')
            return next()
        }
    } else
        return ctx.reply('Please /register to use the app!')
}
