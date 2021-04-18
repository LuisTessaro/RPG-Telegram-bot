const { getEquipment, } = require('../../../services/player/inventory-service')
const { itemStringToItemObject, parseItemWithMod } = require('../../../util/item-utils')

module.exports = async (ctx) => {
  const equipments = await getEquipment(ctx.message.from.id)


  try {
    const msg = Object.keys(equipments.toJSON()).reduce((equipmentText, item) => {
      if (equipments[item] !== '') {
        const [mod, itemName] = equipments[item].split(' ')
        const itemObj = itemStringToItemObject(itemName)
        const itemParsed = parseItemWithMod(itemObj, mod)
        return equipmentText + `${item.charAt(0).toUpperCase() + item.slice(1)}:\n${equipments[item]}${calculateBonus(itemParsed.bonuses)}\n\n`
      }
      return equipmentText
    }, '')

    return ctx.reply(`Your equiped Items\n\n${msg}`)
  } catch (err) {
    console.log(err)
  }
}


const calculateBonus = bonuses => {
  const bonusParsed = Object.keys(bonuses).reduce((bonusesAcc, stat) => {
    if (bonuses[stat] > 0)
      return bonusesAcc + `\n${stat}: +${bonuses[stat]}`
    return bonusesAcc
  }, '')
  if (bonusParsed)
    return bonusParsed
  return 'No bonus!'
}