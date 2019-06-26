module.exports = async (ctx, next) => {
    if (ctx.session.needsAction)
        return next()
    else
        return ctx.reply('You need to reach the next objective first')
}