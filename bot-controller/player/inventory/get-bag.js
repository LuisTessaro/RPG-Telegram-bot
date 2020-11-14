const Extra = require('telegraf/extra')
const Items = require('../../../models/items/equipment')
const { getBags } = require('../../../services/player/inventory-service')
const { parseItemWithMod } = require('../../../util/item-utils')

module.exports = async (ctx) => {
  const bag = await getBags(ctx.session.userInfo)

  try {
    bag.forEach(async (equipObj) => {
      const itemName = equipObj.name.replace(/ /g, '')

      const parsedItem = parseItemWithMod(Items[itemName], equipObj.modifier)
      console.log(equipObj)
      const message =
        `Name: ${parsedItem.name}\n\n` +
        `Type: ${parsedItem.type.charAt(0).toUpperCase() + parsedItem.type.slice(1)}\n` +
        `Description: ${parsedItem.description}\n` +
        `Bonus: ${calculateBonus(parsedItem.bonuses)}\n` +
        `Amount in Bags: ${equipObj.amount}\n\n`

      await ctx.reply(message, Extra.HTML().markup((m) =>
        m.inlineKeyboard([
          m.callbackButton(`Equip ${equipObj.modifier} ${itemName}`, `equip ${equipObj.modifier} ${itemName}`)
        ])))
    })
  } catch (err) {
    console.log(err)
  }
}

const calculateBonus = (bonuses) => {
  const bonusParsed = Object.keys(bonuses).reduce((bonusesAcc, stat) => {
    if (bonuses[stat] > 0)
      return bonusesAcc + `\n${stat}: +${bonuses[stat]}`
    return bonusesAcc
  }, '')
  if (bonusParsed)
    return bonusParsed
  return 'No bonus!'
}