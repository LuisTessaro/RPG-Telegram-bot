const Telegraf = require('telegraf')
const Items = require('../../../models/items/equipment')
const { getBags } = require('../../../services/player/inventory-service')
const { parseItemWithMod } = require('../../../util/item-utils')

module.exports = async (ctx) => {
  const bag = await getBags(ctx.session.userInfo)

  try {
    const msg = bag.reduce((inventoryMessage, equipObj) => {
      const itemName = equipObj.name.replace(/ /g, '')

      const parsedItem = parseItemWithMod(Items[itemName], equipObj.modifier)

      inventoryMessage += `Name: ${parsedItem.name}\n`
      inventoryMessage += `Type: ${parsedItem.type.charAt(0).toUpperCase() + parsedItem.type.slice(1)}\n`
      inventoryMessage += `Description: ${parsedItem.description}\n`
      inventoryMessage += `Bonus: ${calculateBonus(parsedItem.bonuses)}\n\n`
      return inventoryMessage
    }, 'Bags: \n')

    return ctx.reply(msg, buildInventoryMenu(bag))
  } catch (err) {
    console.log(err)
  }
}

const buildInventoryMenu = bag => {
  const inventoryButtons = (m) => {
    return [...bag.reduce((inventoryButtons, equipObj) => {
      const itemName = equipObj.name.replace(/ /g, '')

      return [...inventoryButtons, m.callbackButton(`/equip ${equipObj.modifier} ${itemName}`)]
    }, []), m.callbackButton('/back 🔙')]
  }
  const inventoryMenu = Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard(
      inventoryButtons(m)
    ).resize())

  return inventoryMenu
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