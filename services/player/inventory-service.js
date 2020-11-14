const Player = require('../../models/mongoose-models/Player')

const Items = require('../../models/items/equipment')

const { giveAnItemAModifier } = require('../../util/item-utils')

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

const equipItem = async ({ telegramId }, mod, itemName, itemSlot, itemSpacedName) => {
  try {
    const player = await Player.findOne({ telegramId })

    if (!validItem(mod, itemSpacedName, player.bag))
      throw 'Invalid item / You dont have that item in your bags'

    player.equipment[itemSlot] = `${mod} ${itemName}`

    await player.save()
    return true
  } catch (err) {
    if (err)
      throw err
  }
}

const addEquipment = async ({ telegramId }, itemName) => {
  try {
    const item = Items[itemName]

    if (!item)
      throw 'Invalid item'

    const modifier = giveAnItemAModifier(item)
    const name = item.name

    const player = await Player.findOne({ telegramId })

    const playerHasIt = await player.bag.find((item, i) => {
      if (item.name === name && item.modifier === modifier) {
        player.bag[i].amount += 1
        return true
      }
    })

    if (!playerHasIt)
      player.bag.push({
        name: name,
        amount: 1,
        modifier: modifier
      })

    await player.save()
    return modifier + ' ' + name
  } catch (err) {
    if (err)
      throw err
  }
}

const validItem = (mod, itemName, bag) => {
  return bag.find(item => {
    if (item.name === itemName && item.modifier === mod)
      return true
  })
}

module.exports = {
  getBags,
  getEquipment,
  equipItem,
  addEquipment,
}