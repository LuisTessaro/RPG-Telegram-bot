const BronzeDagger = {
  name: 'Bronze Dagger',
  description: `A beatup Bronze Dagger.`,
  type: 'weapon',
  baseBonuses: {
    str: 1,
    dex: 0,
    agi: 2,
    con: 0,
    int: 0,
    wis: 0,
    car: 0,
    wil: 0,
    luk: 0,
    defense: 0
  },
  possibleModifiers: [
    {
      prefix: '',
      odds: 40,
      modifier: {}
    },
    {
      prefix: 'Broken',
      odds: 40,
      modifier: {
        str: -1,
        agi: -2,
      }
    },
    {
      prefix: 'Rusted',
      odds: 10,
      modifier: {
        str: -1,
        agi: -1,
      }
    },
    {
      prefix: 'Sharpened',
      odds: 8,
      modifier: {
        str: 0,
        agi: 0,
      }
    },
    {
      prefix: 'Pristine',
      odds: 2,
      modifier: {
        str: 1,
        agi: 1,
      }
    },
  ],
}

const weightedRandom = itemSet => {
  const reducedSet = itemSet.reduce((set, item) => {
    return [...set, ...fillArray(item, item.odds)]
  }, [])
  return reducedSet[Math.floor(Math.random() * (reducedSet.length - 1))]
}

const fillArray = (item, len) => {
  if (len == 0) return []
  const itemList = []

  for (let i = 0; i < len; i++)
    itemList.push(item)

  return itemList
}

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
  return {
    name: item.name,
    description: item.description,
    type: item.type,
    modifier: weightedRandom(item.possibleModifiers).prefix
  }
}

const parseItem = (item, modifierName) => {
  const properName = item.name.replace(/_/g, ' ')

  const mods = item.possibleModifiers.find(mod => mod.prefix === modifierName) || {}

  return {
    name: `${modifierName} ${properName}`,
    id_name: item.name,
    description: item.description,
    type: item.type,
    bonuses: calcWeaponModifier(item.baseBonuses, mods.modifier)
  }
}

console.log(giveAnItemAModifier(BronzeDagger))

console.log(parseItem(BronzeDagger))