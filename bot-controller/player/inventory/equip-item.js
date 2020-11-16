const { equipItem } = require('../../../services/player/inventory-service')
const Items = require('../../../models/items/equipment')

module.exports = async (ctx) => {
  try {
    const [mod, itemName] = ctx.match.input.replace(/equip /g, '').split(' ')

    const item = Items[itemName]

    if (!item)
      throw 'Item does not exist'

    await equipItem(ctx.session.userInfo, mod, itemName, item.type, item.name, item.availableClasses)

    await ctx.answerCbQuery()

    return ctx.reply(`${mod} ${itemName} was added to your equipments`)
  } catch (err) {
    throw (err)
  }
}
