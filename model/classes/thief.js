module.exports.getSkills = [
  {
    skillName: 'Stab',
    damage: (att) => {
      return att.str + (att.dex * 2)
    },
    levelRequired: 1,
    odds: 40,
    emoji: '🔪'
  },
  {
    skillName: 'Backstab',
    damage: (att) => {
      return (att.str + att.dex) * 2
    },
    levelRequired: 1,
    odds: 25,
    emoji: '🔪'
  },
  {
    skillName: 'Shadow Step',
    damage: (att) => {
      return (att.str + att.agi + att.dex) * 4
    },
    levelRequired: 1,
    odds: 10,
    emoji: '👻'
  },
  {
    skillName: 'Cross Slash',
    damage: (att) => {
      return att.str
    },
    levelRequired: 15,
    odds: 5,
    emoji: '⚔️'
  },
  {
    skillName: 'Curse: DEATH',
    damage: () => {
      return att.dex * 25
    },
    levelRequired: 1,
    odds: 3,
    emoji: '😈'
  }
]

module.exports.getHealingSkills = [{
  skillName: 'Crimson vial',
  heal: (att) => {
    return att.con
  },
  levelRequired: 1,
  odds: 30,
  emoji: '💉'
}]

module.exports.hpFormula = (att, lvl) => {
  return (att.con * 10) + lvl
}

module.exports.accuracyFormula = (att, lvl) => {
  return (att.dex * 2) + lvl
}

module.exports.fleeFormula = (att, lvl) => {
  return att.agi * 2 + lvl
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