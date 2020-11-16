const Extra = require('telegraf/extra')
const Items = require('../../../models/items/equipment')
const { getBags } = require('../../../services/player/inventory-service')
const { parseItemWithMod } = require('../../../util/item-utils')

const validSlots = [
  'head',
  'legs',
  'body',
  'weapon',
  'shield',
  'trinket',
  'ring',
]

module.exports = async (ctx) => {
  const slot = ctx.message.text.split(' ')[1]

  try {
    if (!slot || !validSlots.includes(slot)) {
      console.log('invalid')
      throw 'Invalid Slot'
    }

    const { bag, classId } = await getBags(ctx.session.userInfo)

    const filteredBag = bag.filter(item => item.type === slot)
    await ctx.reply(`Seeing all ${slot} items. ✅ means equipable and ❌ not equipable`)
    filteredBag.forEach(async (equipObj) => {
      const itemName = equipObj.name.replace(/ /g, '')
      const parsedItem = parseItemWithMod(Items[itemName], equipObj.modifier)

      console.log(parsedItem, classId)
      const message =
        `Name: ${parsedItem.name} - ${parsedItem.availableClasses.includes(classId) ? '✅' : '❌'}\n\n` +
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
    throw err
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