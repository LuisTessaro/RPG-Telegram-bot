const Player = require('../model/mongoose-models/Player')

module.exports = async (ctx, next) => {
    try {
        const player = await Player.findOne({ telegramId: ctx.message.from.id })

        if (player) {
            ctx.session = {
                ...ctx.session,
                player,
            }

            if (ctx.session.authed)
                return next()

            ctx.session = {
                ...ctx.session,
                authed: true,
            }

            console.log('[INFO]', ctx.session.player.username, 'was authed to session...')
            return next()
        }

        return ctx.reply('Please /register to use the app!')
    } catch {
        return ctx.reply('Server error, please try again later')
    }
}
