const { weightedRandom } = require('./weighted-random')
const Item = require('../models/items/equipment')

const calcWeaponModifier = (baseBonus, modifier) => {
  if (!modifier)
    return baseBonus

  return Object.keys(modifier).reduce((compoundedBonus, bonus) => {
    return {
      ...compoundedBonus,
      [bonus]: compoundedBonus[bonus] + modifier[bonus]
    }
  }, baseBonus)
}

const giveAnItemAModifier = item => {
  return weightedRandom(item.possibleModifiers).prefix
}

const parseItemWithMod = (item, modifierName) => {
  const mods = item.possibleModifiers.find(mod => mod.prefix === modifierName) || {}

  return {
    name: `${modifierName} ${item.name}`,
    id_name: item.name,
    description: item.description,
    type: item.type,
    availableClasses: item.availableClasses,
    bonuses: calcWeaponModifier(item.baseBonuses, mods.modifier)
  }
}

const itemStringToItemObject = itemString => {
  const foundItem = Item[itemString]
  if (!foundItem)
    throw `Item not found ${foundItem}`

  return foundItem
}

module.exports = {
  calcWeaponModifier,
  giveAnItemAModifier,
  parseItemWithMod,
  itemStringToItemObject,
}