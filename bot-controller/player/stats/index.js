const { addLevel } = require('../../../services/player/exp-service')
const validStats = ['str', 'dex', 'agi', 'con', 'int', 'wis', 'car', 'wil', 'luk']

module.exports = async (ctx) => {
    const stat = ctx.message.text.split(' ')[1]

    if (!stat || !validStats.includes(stat))
        throw 'Invalid stat to level up'

    await addLevel(ctx.session.userInfo, stat)

    return ctx.reply(stat + ' leveled up!')
}