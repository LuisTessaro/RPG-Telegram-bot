const Player = require('../../../../model/mongoose-models/Player')
const Items = require('../../../../model/items/equipment')

const isValidItem = (item, player) => {
    if (!item) return false
    return player.bag.find(bagItem => bagItem === item)
}

module.exports = async ctx => {
    const item = ctx.message.text.split(' ')[1]

    if (isValidItem(item, ctx.session.player)) {
        const equip = Items[item]

        ctx.session.player.inventory = {
            ...ctx.session.player.inventory,
            [equip.type]: equip
        }

        const newInventory = ctx.session.player.inventory

        await Player.findByIdAndUpdate(ctx.session.player._id, { inventory: newInventory })

        return ctx.reply(equip.name + ' was added to your equipments')
    }

    return ctx.reply(await 'Invalid item')
}
