const AdventureProgress = require('../model/mongoose-models/AdventureProgress')

module.exports = async (ctx, next) => {
    const progress = await AdventureProgress.find({ telegramId: ctx.session.player.telegramId})
    if (progress && progress.length > 0 && ctx.session.adventuring) {
        ctx.session.progress = progress[0]
        return next()
    } else {
        return ctx.reply('Choose an adventure or start grinding. Use /adventures /grindSpots to start!')
    }
}