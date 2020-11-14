const { getPlayer } = require('../../../services/player/info-service')

module.exports = async (ctx) => {
    const player = await getPlayer(ctx.session.userInfo)
    const { username, className, exp, level } = player

    const message = `${username}: ${className}\nLevel ${level}\nExperience: ${exp}`
    return ctx.reply(message)
}