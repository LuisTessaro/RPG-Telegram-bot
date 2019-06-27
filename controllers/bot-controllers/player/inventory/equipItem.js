const Player = require('../../../../model/mongoose-models/Player')
const Itens = require('../../../../model/itens/equipment')

module.exports = async (ctx) => {
    const item = ctx.message.text.split(' ')[1]
    const flag = await validItem(item, ctx.session.player._id)
    if (flag === true) {
        const equip = Itens[item]
        ctx.session.player.inventory[equip.type] = equip
        const newInventory = ctx.session.player.inventory
        await Player.findByIdAndUpdate(ctx.session.player._id,
            {
                $set:
                {
                    inventory: newInventory
                }
            },
            {
                new: true
            })

        ctx.reply(equip.name + ' was added to your equipments')
    } else {
        ctx.reply(await 'Invalid item')
    }
}

const validItem = async (item, id) => {
    if (!item) return false
    const player = await Player.findById(id)
    if (player.bag.find(itemE => itemE === item))
        return true
    else
        return false
}