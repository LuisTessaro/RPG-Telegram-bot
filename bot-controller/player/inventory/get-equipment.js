const { getEquipment } = require('../../../services/player/inventory-service')
const Items = require('../../../models/items/equipment')

module.exports = async (ctx) => {
  const equipments = await getEquipment(ctx.session.userInfo)
  try {
    const msg = Object.keys(equipments.toJSON()).reduce((equipmentText, item) => {
      if (equipments[item] !== '')
        return equipmentText + `${item.charAt(0).toUpperCase() + item.slice(1)}: ${equipments[item] ? equipments[item] + ' ' + calculateBonus(Items[equipments[item]].bonuses) : ''}\n\n`

      return equipmentText
    }, '')

    return ctx.reply(`Your equiped Items\n\n${msg}`)
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