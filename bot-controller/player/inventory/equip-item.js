const { equipItem } = require('../../../services/player/inventory-service')
const Items = require('../../../models/items/equipment')

module.exports = async ctx => {
  const itemName = ctx.message.text.split(' ')[1]

  const item = Items[itemName]

  if (!item)
    throw 'Item does not exist'

  await equipItem(ctx.session.userInfo, itemName, item.type)

  return ctx.reply(itemName + ' was added to your equipments')
}
