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

    const group = groupByName(filteredBag)

    Object.keys(group).forEach(async itemName => {
      const itemKey = itemName.replace(/ /g, '')
      const parsedItem = Items[itemKey]

      const playerItems = group[itemName]

      const message =
        `Name: ${itemName} - ${parsedItem.availableClasses.includes(classId) ? '✅' : '❌'}\n\n` +
        `Type: ${parsedItem.type.charAt(0).toUpperCase() + parsedItem.type.slice(1)}\n` +
        `${playerItems.reduce((text, item) => `${item.modifier} - ${item.amount} | ` + text, '')}\n` +
        `Description: ${parsedItem.description}\n`

      await ctx.reply(message, buildInline(playerItems, parsedItem))
    })

  } catch (err) {
    throw err
  }
}

const groupByName = bag => {
  return bag.reduce((grouped, item) => {
    if (grouped[item.name]) {
      return {
        ...grouped,
        [item.name]: [...grouped[item.name], item]
      }
    }
    return {
      ...grouped,
      [item.name]: [item]
    }
  }, {})
}

const buildInline = (items, parsedItem) => {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      items.map(item => {
        const parsedItemWithMod = parseItemWithMod(parsedItem, item.modifier)
        const bonusText = calculateBonus(parsedItemWithMod.bonuses)
        const itemName = item.name.replace(/ /g, '')
        return [m.callbackButton(`${item.modifier} ${item.name} \n- ${bonusText}`, `equip ${item.modifier} ${itemName}`)]
      })
    )
  )
}

const calculateBonus = (bonuses) => {
  const bonusParsed = Object.keys(bonuses).reduce((bonusesAcc, stat) => {
    if (bonuses[stat] > 0)
      return bonusesAcc + ` ${stat}: +${bonuses[stat]}`
    return bonusesAcc
  }, '')
  if (bonusParsed)
    return bonusParsed
  return 'No bonus!'
}