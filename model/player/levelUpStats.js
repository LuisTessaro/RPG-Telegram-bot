const Player = require('../mongoose-models/Player')
const {
    removeExp,
    addLevel,
} = require('./levelExp')

module.exports = async (ctx, stat, amount) => {
    const player = ctx.session.player
    const requiredXp = Math.pow(player.level * 10, 2)

    if (requiredXp > player.exp)
        return ctx.reply(`Not enought exp, you have ${player.exp}exp, but you need ${requiredXp}exp to levelup`)

    await removeExp(ctx, requiredXp)
    await addLevel(ctx)

    amount = amount || 1

    const statUp = {
        str: { 'attributes.str': ctx.session.player.attributes.str + amount },
        dex: { 'attributes.dex': ctx.session.player.attributes.dex + amount },
        agi: { 'attributes.agi': ctx.session.player.attributes.agi + amount },
        con: { 'attributes.con': ctx.session.player.attributes.con + amount },
        int: { 'attributes.int': ctx.session.player.attributes.int + amount },
        wis: { 'attributes.wis': ctx.session.player.attributes.wis + amount },
        car: { 'attributes.car': ctx.session.player.attributes.car + amount },
        wil: { 'attributes.wil': ctx.session.player.attributes.wil + amount },
        luk: { 'attributes.luk': ctx.session.player.attributes.luk + amount },
    }

    ctx.session.player.attributes[stat] = ctx.session.player.attributes[stat] + amount

    await Player.findByIdAndUpdate(ctx.session.player._id, {
        $set: statUp[stat]
    }, {
        new: true
    })

    return ctx.reply('Leved up ' + stat + ' by one!')
}

