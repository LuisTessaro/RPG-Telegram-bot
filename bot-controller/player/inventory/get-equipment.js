const { getEquipment } = require('../../../services/player/inventory-service')
const Items = require('../../../models/items/equipment')

module.exports = async (ctx) => {
  const equipments = await getEquipment(ctx.session.userInfo)

  try {
    const msg = Object.keys(equipments.toJSON()).reduce((equipmentText, item) => {
      if (equipments[item] !== '')
        return equipmentText + `${item.charAt(0).toUpperCase() + item.slice(1)}: ${equipments[item]}\n\n`
      return equipmentText
    }, '')

    return ctx.reply(`Your equiped Items\n\n${msg}`)
  } catch (err) {
    console.log(err)
  }
}