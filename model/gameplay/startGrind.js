const grindTime = 2 * 60 * 60 * 1000
// const grindTime = 30 * 1000
const xp = require('../../model/player/levelExp')
const { addItensToBag } = require('../../model/player/addItensToBag')

module.exports.grind = async (ctx, map) => {
    ctx.session.grinding = true
    setTimeout(async () => {
        ctx.session.grinding = false
        const exp = dice(2500)
        await xp.addExp(ctx, exp)
        const itens = ['HylianShield']
        await addItensToBag(ctx, itens)
        ctx.reply(`You finished grinding on ${map}: you got ${exp}exp and got these itens:${itens}`)
    }, grindTime)
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1) + 1)
}
