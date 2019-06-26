const Player = require('../model/mongoose-models/Player')

module.exports = async (ctx, next) => {
    const player = await Player.find({ telegramId: ctx.message.from.id })
    if (player && player.length > 0) {
        if (ctx.session.authed)
            return next()
        else {
            ctx.session.authed = true
            ctx.session.player = player[0]
            ctx.session.player.inventory = player[0].inventory || []
            ctx.session.player.bag = player[0].bag || []
            console.log('[INFO]', ctx.session.player.username, 'was authed to session...')
            return next()
        }
    } else
        return ctx.reply('Please /register to use the app!')
}