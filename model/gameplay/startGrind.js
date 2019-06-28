// const grindTime = 2 * 60 * 60 * 1000
const xp = require('../../model/player/levelExp')
const { addItensToBag } = require('../../model/player/addItensToBag')

module.exports.grind = async (ctx, map) => {
    ctx.session.grinding = true
    setTimeout(async () => {
        ctx.session.grinding = false
        const exp = Math.floor((dice(map.possibleExp) / 2) + (map.possibleExp / 2))
        await xp.addExp(ctx, exp)
        const grindDrop = async (possibleRewards, trash, odds) => {
            const lootRoll = dice(100)
            if (lootRoll > odds) {
                const reward = [possibleRewards[Math.floor(Math.random() * possibleRewards.length)]]
                await addItensToBag(ctx, reward)
                return `you got ${exp}exp and got these itens:${reward}`
            }
            else {
                const tra = trash[Math.floor(Math.random() * trash.length)]
                return `you got ${exp}exp and got these itens:${tra}`
            }
        }
        return await ctx.reply(`Your companion finished grinding on ${map.name}:${await grindDrop(map.possibleRewards, map.trash, map.odds)}`)
    }, map.grindTime * 60 * 1000)
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1) + 1)
}