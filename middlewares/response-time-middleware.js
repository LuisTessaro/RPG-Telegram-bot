module.exports = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    const text = ctx.session.userInfo

    if (text)
        console.log(`Response time for ${text.username} - ${text.telegramId}: ${ms}ms`)
    else
        console.log(`Response time ${ms}ms`)
}