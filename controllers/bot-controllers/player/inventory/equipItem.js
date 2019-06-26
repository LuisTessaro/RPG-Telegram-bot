const Player = require('../../../../model/mongoose-models/Player')
const Itens = require('../../../../model/itens/equipment')

module.exports = async (ctx) => {
    const item = ctx.message.text.split(' ')[1]
    if (item && validItem(item)) {
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

        ctx.reply(equip.name + ' was added to your inventory')
    } else {
        ctx.reply(await 'No item')
    }
}

const validItem = (item) => {
    if (Itens[item]) return true
    else return false
}