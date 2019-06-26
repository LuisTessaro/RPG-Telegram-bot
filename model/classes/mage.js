module.exports.getSkills = [
  {
    skillName: 'Fire Bolt',
    damage: (att) => {
      return att.int * 3
    },
    levelRequired: 1,
    odds: 40,
    emoji: '🔥'
  },
  {
    skillName: 'Frost Bolt',
    damage: (att) => {
      return att.int * 3
    },
    levelRequired: 1,
    odds: 40,
    emoji: '❄️'
  },
  {
    skillName: 'Arcane Bolt',
    damage: (att) => {
      return att.int * 3
    },
    levelRequired: 1,
    odds: 40,
    emoji: '🔮'
  },
  {
    skillName: 'METEOR!!!!',
    damage: (att) => {
      return att.int * 25
    },
    levelRequired: 1,
    odds: 3,
    emoji: '☄️'
  }
]
module.exports.getHealingSkills = [
  {
  skillName: 'Cauterize Wounds',
  heal: (att) => {
    return att.int
  },
  levelRequired: 1,
  odds: 30,
  emoji: '🔥'
}]

module.exports.hpFormula = (att, lvl) => {
  return (att.con * 2) + lvl * 2 + 50
}

module.exports.accuracyFormula = (att, lvl) => {
  return (att.dex * 5) + lvl
}

module.exports.fleeFormula = (att, lvl) => {
  return lvl
}

module.exports.autoAttackFormula = (att, lvl) => {
  return att.str
}

module.exports.sneakyFormula = (att, lvl) => {
  return 1
}

module.exports.bargainFormula = (att, lvl) => {
  return 1
}