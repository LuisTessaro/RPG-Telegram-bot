const Player = require('../../models/mongoose-models/Player')

const getBags = async ({ telegramId }) => {
  try {
    const { bag } = await Player.findOne({ telegramId })
    return bag
  } catch {
    throw 'Server Error'
  }
}

const getEquipment = async ({ telegramId }) => {
  try {
    const { equipment } = await Player.findOne({ telegramId })
    return equipment
  } catch {
    throw 'Server Error'
  }
}

const equipItem = async ({ telegramId }, itemName, itemSlot) => {
  try {
    const player = await Player.findOne({ telegramId })

    if (!validItem(itemName, player.bag))
      throw 'Invalid item / You dont have that item in your bags'

    player.equipment[itemSlot] = itemName
    
    await player.save()
    return true
  } catch (err) {
    if (err)
      throw err
  }
}

const validItem = (itemName, bag) => {
  if (!bag.includes(itemName))
    return false
  return true
}

module.exports = {
  getBags,
  getEquipment,
  equipItem,
}