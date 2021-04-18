const { addLevel } = require('../../../services/player/exp-service')
const validStats = ['str', 'dex', 'agi', 'con', 'int', 'wis', 'car', 'wil', 'luk']

module.exports = async (ctx) => {
    const stat = ctx.message.text.split(' ')[1]

    if (!stat || !validStats.includes(stat))
        return ctx.reply('Invalid stat to level up')

    const { err } = await addLevel(ctx.message.from.id, stat)
    
    if (err)
        return ctx.reply(err)

    return ctx.reply(stat + ' leveled up!')
}