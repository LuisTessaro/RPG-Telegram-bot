const { equipItem } = require('../../../services/player/inventory-service')
const { parseItemWithMod } = require('../../../util/item-utils')
const Items = require('../../../models/items/equipment')

module.exports = async (ctx) => {
  try {
    const [mod, itemName, telegramId] = ctx.match.input.replace(/equip /g, '').split(' ')

    const item = Items[itemName]

    const parsedItem = parseItemWithMod(item, mod)

    if (!item)
      throw 'Item does not exist'

    await equipItem(telegramId, mod, itemName, item.type, item.name, item.availableClasses)

    await ctx.answerCbQuery()

    return ctx.reply(`${mod} ${itemName} was added to your equipments\n\nBonuses:\n${calculateBonus(parsedItem.bonuses)}`)
  } catch (err) {
    throw (err)
  }
}

const calculateBonus = (bonuses) => {
  const bonusParsed = Object.keys(bonuses).reduce((bonusesAcc, stat) => {
    if (bonuses[stat] > 0)
      return bonusesAcc + `${stat}: +${bonuses[stat]}\n`
    return bonusesAcc
  }, '')
  if (bonusParsed)
    return bonusParsed
  return 'No bonus!'
}
