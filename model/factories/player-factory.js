const archer = require('../classes/archer')
const thief = require('../classes/thief')
const mage = require('../classes/mage')
const warrior = require('../classes/warrior')
const cleric = require('../classes/cleric')

module.exports.buildStarterPlayer = (data, classe) => {
  return {
    username: data.username,
    firstName: data.first_name,
    telegramId: data.id,
    classe: classe,
    level: 1,
    exp: 0,
    attributes: {
      str: 1,
      dex: 1,
      agi: 1,
      con: 1,
      int: 1,
      wis: 1,
      car: 1,
      wil: 1,
      luk: 1
    },
    equipment: {},
    bag: []
  }
}

module.exports.buildPlayer = (player) => {
  const classObject = getClassObject(player.classe)
  const equipedItens = Object.keys(player.inventory).map(position => player.inventory[position])
  const equipmentBonus = equipedItens.reduce((bonus, equip) => {
    Object.keys(equip.bonuses).forEach(key => {
      if (equip.bonuses[key] > 0)
        bonus[key] += equip.bonuses[key]
    })

    return bonus
  },
    {
      str: 0,
      dex: 0,
      agi: 0,
      con: 0,
      int: 0,
      wis: 0,
      car: 0,
      wil: 0,
      luk: 0,
      defense: 0
    })

  const composedBonuses = composeBonuses(player.attributes, equipmentBonus)

  return {
    username: player.username,
    classe: player.classe,
    attributes: player.attributes,
    skills: classObject.getSkills.filter((skill) => {
      if (player.level >= skill.levelRequired)
        return skill
    }),
    healingSkills: classObject.getHealingSkills.filter((skill) => {
      if (player.level >= skill.levelRequired)
        return skill
    }),
    hp: classObject.hpFormula(composedBonuses, player.level),
    maxHp: classObject.hpFormula(composedBonuses, player.level),
    autoAttackDmg: classObject.autoAttackFormula(composedBonuses, player.level),
    flee: classObject.fleeFormula(composedBonuses, player.level),
    accuracy: classObject.accuracyFormula(composedBonuses, player.level),
    sneaky: classObject.sneakyFormula(composedBonuses, player.level),
    bargainLevel: classObject.bargainFormula(composedBonuses, player.level),
    iniciativeBonus: 0,
    defense: equipmentBonus.defense,
    equipmentBonus: equipmentBonus,
    playerAttributes: composedBonuses,
  }
}

const getClassObject = (playerClass) => {
  switch (playerClass) {
    case 'archer':
      return archer
    case 'thief':
      return thief
    case 'mage':
      return mage
    case 'warrior':
      return warrior
    case 'cleric':
      return cleric
  }
}

const composeBonuses = (playerAttributes, bonusAttributes) => {
  const composed = {
    str: playerAttributes.str + bonusAttributes.str,
    dex: playerAttributes.dex + bonusAttributes.dex,
    agi: playerAttributes.agi + bonusAttributes.agi,
    con: playerAttributes.con + bonusAttributes.con,
    int: playerAttributes.int + bonusAttributes.int,
    wis: playerAttributes.wis + bonusAttributes.wis,
    wil: playerAttributes.wil + bonusAttributes.wil,
    luk: playerAttributes.luk + bonusAttributes.luk,
  }
  return composed
}