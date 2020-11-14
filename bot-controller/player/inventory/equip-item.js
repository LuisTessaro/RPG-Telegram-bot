const { equipItem } = require('../../../services/player/inventory-service')
const Items = require('../../../models/items/equipment')

module.exports = async ctx => {
  const [_, mod, itemName] = ctx.message.text.split(' ')

  const item = Items[itemName]

  if (!item)
    throw 'Item does not exist'

  await equipItem(ctx.session.userInfo, mod, itemName, item.type, item.name)

  return ctx.reply(`${mod} ${itemName} was added to your equipments`)
}
