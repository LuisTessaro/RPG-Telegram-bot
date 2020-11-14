const Telegraf = require('telegraf')
const Items = require('../../../models/items/equipment')
const { getBags } = require('../../../services/player/inventory-service')

module.exports = async (ctx) => {
  const bag = await getBags(ctx.session.userInfo)

  const msg = bag.reduce((inventoryMessage, equipName) => {
    const equip = Items[equipName]
    inventoryMessage += `Name: ${equip.name}\n`
    inventoryMessage += `Type: ${equip.type.charAt(0).toUpperCase() + equip.type.slice(1)}\n`
    inventoryMessage += `Description: ${equip.description}\n`
    inventoryMessage += `Bonus: ${calculateBonus(equip.bonuses)}\n\n`
    return inventoryMessage
  }, 'Bags: \n')

  return ctx.reply(msg, buildInventoryMenu(bag))
}

const buildInventoryMenu = bag => {
  const inventoryButtons = (m) => {
    return [...bag.reduce((inventoryButtons, equipName) => {
      return [...inventoryButtons, m.callbackButton('/equip ' + equipName)]
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