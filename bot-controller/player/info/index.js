const infoService = require('../../../services/player/info-service')

module.exports = async (ctx) => {
    const player = await infoService(ctx.session.userInfo)

    const { str, dex, agi, con, int, wis, car, wil, luk, } = player.attributes

    const { username, className, exp, level } = player

    const message = `${username}: ${className}\nLevel ${level}\nExperience: ${exp}\n\nBase attributes:\nstr: ${str}\ndex: ${dex}\nagi: ${agi}\ncon: ${con}\nint: ${int}\nwis: ${wis}\ncar: ${car}\nwil: ${wil}\nluk: ${luk}`
    return ctx.reply(message)
}