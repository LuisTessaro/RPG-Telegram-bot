const { addExp } = require('../../model/player/levelExp')
const { addItensToBag } = require('../../model/player/addItensToBag')

const grind = async (ctx, map) => {
    ctx.session.grinding = true

    setTimeout(async () => {
        ctx.session.grinding = false
        const exp = Math.floor((dice(map.possibleExp) / 2) + (map.possibleExp / 2))

        await addExp(ctx, exp)

        const grindDrop = async (possibleRewards, trash, odds) => {
            const lootRoll = dice(100)
            if (lootRoll > odds) {
                const reward = [possibleRewards[Math.floor(Math.random() * possibleRewards.length)]]
                await addItensToBag(ctx, reward)
                return `you got ${exp}exp and got this item: ${reward}`
            }
            else {
                const tra = trash[Math.floor(Math.random() * trash.length)]
                return `you got ${exp}exp and got this item: ${tra}`
            }
        }

        return await ctx.reply(`Your companion finished grinding on ${map.name}: ${await grindDrop(map.possibleRewards, map.trash, map.odds)}`)
    }, map.grindTime * 60 * 1000)
}

const dice = (faces) => {
    return Math.floor((Math.random() * faces + 1) + 1)
}

module.exports = {
    grind
}