const { weightedRandom } = require('./weighted-random')

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
    bonuses: calcWeaponModifier(item.baseBonuses, mods.modifier)
  }
}

module.exports = {
  calcWeaponModifier,
  giveAnItemAModifier,
  parseItemWithMod,
}