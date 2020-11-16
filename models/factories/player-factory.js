const {
  archer,
  thief,
  mage,
  warrior,
  cleric,
} = require('../classes')

const classesObj = {
  archer,
  thief,
  mage,
  warrior,
  cleric,
}

const buildStarterPlayer = (classId, specId, username, first_name, id) => {
  return {
    firstName: first_name,
    username: username,
    telegramId: id,
    classId: classId,
    specId: specId,
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
  }
}

const buildPlayer = player => {
  const classObject = classesObj[player.classe]
  const equippedItems = player.inventory ? Object.keys(player.inventory).map(position => player.inventory[position]) : []
  const equipmentBonus = equippedItems
    .reduce((bonus, equip) => {
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
    id: player._id,
    username: player.username,
    classe: player.classe,
    level: player.level,
    attributes: player.attributes,
    resource: player.resource,
    maxResource: player.maxResource,
    skills: classObject.getSkills.filter(skill => player.level >= skill.levelRequired),
    healingSkills: classObject.getHealingSkills.filter(skill => player.level >= skill.levelRequired),
    hp: classObject.hpFormula(composedBonuses, player.level),
    maxHp: classObject.hpFormula(composedBonuses, player.level),
    autoAttackDmg: classObject.autoAttackFormula(composedBonuses, player.level),
    flee: classObject.fleeFormula(composedBonuses, player.level),
    accuracy: classObject.accuracyFormula(composedBonuses, player.level),
    iniciativeBonus: composedBonuses.wil,
    defense: equipmentBonus.defense,
    equipmentBonus: equipmentBonus,
    playerAttributes: composedBonuses,
  }
}

const composeBonuses = (playerAttributes, bonusAttributes) => {
  const atts = ['str', 'dex', 'agi', 'con', 'int', 'wis', 'wil', 'luk',]

  return atts.reduce((composed, att) => {
    return {
      ...composed,
      [att]: playerAttributes[att] + bonusAttributes[att]
    }
  }, {})
}

module.exports = {
  buildStarterPlayer,
  buildPlayer
}