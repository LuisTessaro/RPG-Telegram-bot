const Player = require('../../models/mongoose-models/Player')
const Items = require('../../models/items/equipment')

const { giveAnItemAModifier, parseItemWithMod, itemStringToItemObject } = require('../../util/item-utils')

const getBags = async ({ telegramId }) => {
  try {
    const player = await Player.findOne({ telegramId })
    return {
      bag: player.bag,
      classId: player.classId
    }
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

const equipItem = async ({ telegramId }, mod, itemName, itemSlot, itemSpacedName, availableClasses) => {
  try {
    const player = await Player.findOne({ telegramId })
    if (!availableClasses.includes(player.classId))
      throw 'Invalid not available to be equiped by your class. You can sell it to other players or the to the market.'

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
    const type = item.type

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
        modifier: modifier,
        type: type
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

const compoundAttributes = async ({ telegramId }) => {
  const player = await Player.findOne({ telegramId })
  const { attributes, equipment } = player

  const equipAsJSON = equipment.toJSON()
  const itemsToCalc = Object.keys(equipAsJSON).reduce((itemsCalc, item) => {
    const isValidItem = equipAsJSON[item] !== '' ? equipAsJSON[item] : undefined
    if (isValidItem) {
      return [
        ...itemsCalc,
        equipAsJSON[item],
      ]
    }
    return itemsCalc
  }, [])

  const itemObjectWithMods = itemsToCalc.map(itemCalc => {
    const [mod, itemName] = itemCalc.split(' ')
    return {
      itemObject: itemStringToItemObject(itemName),
      mod: mod,
    }
  })

  const parsedItemObjectWithMods = itemObjectWithMods.map(itemOMods => {
    return parseItemWithMod(itemOMods.itemObject, itemOMods.mod)
  })


  const equipmentsBonus = parsedItemObjectWithMods.reduce((acc, e) => {
    const { bonuses } = e
    return compoundBonus(acc, bonuses)
  }, {
    str: 0,
    dex: 0,
    agi: 0,
    con: 0,
    int: 0,
    wis: 0,
    wil: 0,
    luk: 0,
    defense: 0,
  })

  const compoundedFull = compoundBonus(equipmentsBonus, attributes)

  const compoundedFullNoNegative = Object.keys(compoundedFull).reduce((noPositiveBonus, bonusKey) => {
    return {
      ...noPositiveBonus,
      [bonusKey]: compoundedFull[bonusKey] < 1 ? 1 : compoundedFull[bonusKey]
    }
  }, compoundedFull)

  return {
    equipmentNames: itemsToCalc.map(name => ' ' + name),
    playerRawBonus: attributes,
    equipmentsBonus: equipmentsBonus,
    compoundedFullBonus: compoundedFull,
    compoundedFullNoNegativesBonus: compoundedFullNoNegative,
  }
}

const compoundBonus = (bonus1, bonus2) => {
  const helper = {
    str: 0,
    dex: 0,
    agi: 0,
    con: 0,
    int: 0,
    wis: 0,
    wil: 0,
    luk: 0,
    defense: 0,
  }
  return Object.keys(helper).reduce((comp, b) => {
    return {
      ...comp,
      [b]: existThenGiveMeN(bonus1[b]) + existThenGiveMeN(bonus2[b])
    }
  }, helper)
}

const existThenGiveMeN = v => v ? v : 0

module.exports = {
  getBags,
  getEquipment,
  equipItem,
  addEquipment,
  compoundAttributes,
}