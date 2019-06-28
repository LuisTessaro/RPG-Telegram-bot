const levelUpStats = require('../../../../model/player/levelUpStats')
const validStats = ['str', 'dex', 'agi', 'con', 'int', 'wis', 'car', 'wil', 'luk']

module.exports.levelup = async (ctx) => {
    const stat = ctx.message.text.split(' ')[1]
    if (stat && validStats.includes(stat)) {
        return await levelUpStats.addLevel(ctx, stat)
    }
    else
        ctx.reply('Invalid stat')
}