module.exports.getSkills = [
  {
    skillName: 'Weapon Swing',
    damage: (att) => {
      return att.str
    },
    levelRequired: 1,
    odds: 70,
    emoji: '😤'
  },
  {
    skillName: 'Furious Slash',
    damage: (att) => {
      return att.str * 2
    },
    levelRequired: 1,
    odds: 40,
    emoji: '😤'
  },
  {
    skillName: 'Rage!!!',
    damage: (att) => {
      return ((att.str + att.con) * 2)
    },
    levelRequired: 1,
    odds: 5,
    emoji: '😤'
  },
  {
    skillName: 'Cross Slash',
    damage: (att) => {
      return (att.str + att.dex) * 2
    },
    levelRequired: 15,
    odds: 10,
    emoji: '⚔️'
  },
  {
    skillName: 'Infinity Rampage',
    damage: (att) => {
      return att.str * 25
    },
    levelRequired: 1,
    odds: 3,
    emoji: '☠️'
  }
]

module.exports.getHealingSkills = [{
  skillName: 'Second wind',
  heal: (att) => {
    return att.con
  },
  levelRequired: 1,
  odds: 30,
  emoji: '💨'
}]

module.exports.hpFormula = (att, lvl) => {
  return (att.con * 10) + lvl
}
module.exports.accuracyFormula = (att, lvl) => {
  return (att.dex * 2) + lvl
}

module.exports.fleeFormula = (att, lvl) => {
  return att.agi + lvl
}

module.exports.autoAttackFormula = (att, lvl) => {
  return att.str + att.dex + att.agi + lvl
}

module.exports.sneakyFormula = (att, lvl) => {
  return 1
}

module.exports.bargainFormula = (att, lvl) => {
  return 1
}